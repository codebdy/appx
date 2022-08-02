import { Spin, Tree } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import "./index.less"
import { DataNode, TreeProps } from 'antd/lib/tree';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreatePageDialog from './CreatePageDialog';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { nodesState, pageListState, pagesState } from './recoil/atoms';
import { useDesignerParams, useDesingerKey } from '../../context';
import { IListNode, ListNodeType } from './recoil/IListNode';
import { useGetPage } from './hooks/useGetPage';
import { usePageList } from './hooks/usePageList';
import { useInit } from './hooks/useInit';
import { useShowError } from '../../../hooks/useShowError';
import CategoryLabel from './CategoryLabel';
import { usePages } from './hooks/usePages';
import PageLabel from './PageLabel';
import { selectedPageIdState } from '../../recoil/atom';
import { useGetPageCategory } from './hooks/useGetPageCategory';
import { usePostPageList } from './hooks/usePostPageList';

const { DirectoryTree } = Tree;

const PageListWidget = memo(() => {
  const key = useDesingerKey();
  const setPages = useSetRecoilState(pagesState(key));
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList2 = useRecoilValue(pageListState(key));
  const getPage = useGetPage(key);
  const getPageCategory = useGetPageCategory();
  const { pageList, loading, error } = usePageList()
  const { pages, loading: pagesLoading, error: pagesError } = usePages();
  const [selectedPageId, setSelectedPageId] = useRecoilState(selectedPageIdState(key));
  const [post, { error: postError, loading: posting }] = usePostPageList()

  const init = useInit()
  useEffect(() => {
    setPages(pages || []);
  }, [pages, setPages])

  useShowError(error || pagesError || postError);

  useEffect(() => {
    init(pageList);
  }, [init, pageList])

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const node of nodes) {
      if (node.nodeType === ListNodeType.Page) {
        const page = getPage(node.pageId)
        dataNodes.push({
          title: page && <PageLabel page={page} />,
          key: node.pageId,
          isLeaf: true,
        })
      } else if (node.nodeType === ListNodeType.Category) {
        dataNodes.push({
          title: <CategoryLabel category={node} />,
          key: node.uuid,
          children: node?.children.map((childId) => {
            const page = getPage(childId)
            return {
              title: page && <PageLabel page={page} categoryUuid={node.uuid} />,
              key: childId,
              isLeaf: true,
            }
          })
        })
      }
    }
    return dataNodes
  }, [getPage, nodes])

  const onSelect = (selectedKeys) => {
    const page = getPage(selectedKeys?.[0]);
    if (page?.id) {
      setSelectedPageId(page?.id);
    }
  };

  const onDrop: TreeProps['onDrop'] = useCallback(info => {
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    let newNodes: IListNode[] = JSON.parse(JSON.stringify(nodes || []));

    const draggedNode = newNodes.find(node => node.uuid === dragKey || node.pageId === dragKey);
    let draggedPageId = "";

    //从根目录删除被拖拽的节点
    if (draggedNode) {
      newNodes = newNodes.filter(node => !(node.uuid === dragKey || node.pageId === dragKey));
    }

    for (const node of newNodes) {
      for (const childId of node.children || []) {
        if (childId === dragKey) {
          draggedPageId = dragKey;
          //从子目录删除被拖拽的节点
          node.children = node.children.filter(id => id !== dragKey)
          break;
        }
      }
    }
    const theNode = draggedNode ? draggedNode : {
      pageId: draggedPageId,
      nodeType: ListNodeType.Page,
    };
    const theId = draggedNode ? draggedNode.pageId : draggedPageId;

    for (let i = 0; i < newNodes.length; i++) {
      const node = newNodes[i];
      if (node.pageId === dropKey || node.uuid === dropKey) {

        if (dropPosition === -1 || dropPosition === 1) {
          newNodes.splice(i + dropPosition, 0, theNode)
        } else {
          node.children = [theId, ...node.children]
        }
        break;
      }

      for (let j = 0; j < node.children?.length || 0; j++) {
        if (node.children[i] === theId) {
          node.children.splice(i + dropPosition, 0, theId)
        }
      }
    }

    post({
      ...pageList2,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
      schemaJson: { data: newNodes },
    })
  }, [nodes, pageList2, params.app.id, params.device, post]);


  return (
    <Spin spinning={loading || pagesLoading || posting}>
      <div className='page-list-shell'>
        <div className="page-list-action">
          <CreateCategoryDialog />
          <CreatePageDialog />
        </div>
        <DirectoryTree
          className='page-list-tree'
          selectedKeys={[selectedPageId]}
          allowDrop={(options) => {
            if (!options.dragNode.isLeaf) {
              if (options.dropPosition === 0) {
                return false;
              }
              if (getPageCategory(options.dropNode?.key as any)) {
                return false;
              }
            } else {
              if (options.dropNode.isLeaf) {
                if (options.dropPosition === 0) {
                  return false;
                }
              }
            }
            return true
          }}
          draggable={
            () => {
              return true
            }
          }
          //onDragEnter={onDragEnter}
          onDrop={onDrop}
          onSelect={onSelect}
          treeData={getTreeData()}
        />
      </div>
    </Spin>
  );
});

export default PageListWidget;