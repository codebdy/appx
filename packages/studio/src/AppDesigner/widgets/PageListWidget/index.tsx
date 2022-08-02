import { Spin, Tree } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import "./index.less"
import { DataNode, TreeProps } from 'antd/lib/tree';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreatePageDialog from './CreatePageDialog';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { nodesState, pagesState } from './recoil/atoms';
import { useDesingerKey } from '../../context';
import { ListNodeType } from './recoil/IListNode';
import { useGetPage } from './hooks/useGetPage';
import { usePageList } from './hooks/usePageList';
import { useInit } from './hooks/useInit';
import { useShowError } from '../../../hooks/useShowError';
import CategoryLabel from './CategoryLabel';
import { usePages } from './hooks/usePages';
import PageLabel from './PageLabel';
import { selectedPageIdState } from '../../recoil/atom';
import { useGetPageCategory } from './hooks/useGetPageCategory';

const { DirectoryTree } = Tree;

const PageListWidget = memo(() => {
  const key = useDesingerKey();
  const setPages = useSetRecoilState(pagesState(key));
  const nodes = useRecoilValue(nodesState(key));
  const getPage = useGetPage(key);
  const getPageCategory = useGetPageCategory();
  const { pageList, loading, error } = usePageList()
  const { pages, loading: pagesLoading, error: pagesError } = usePages();
  const [selectedPageId, setSelectedPageId] = useRecoilState(selectedPageIdState(key));

  const init = useInit()
  useEffect(() => {
    setPages(pages || []);
  }, [pages, setPages])

  useShowError(error || pagesError);

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
    setSelectedPageId(page?.id);
  };

  const onDrop: TreeProps['onDrop'] = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    //setGData(data);
  };


  return (
    <Spin spinning={loading || pagesLoading}>
      <div className='page-list-shell'>
        <div className="page-list-action">
          <CreateCategoryDialog />
          <CreatePageDialog />
        </div>
        <DirectoryTree
          className='page-list-tree'
          selectedKeys={[selectedPageId]}
          allowDrop={(options) => {
            if(!options.dragNode.isLeaf){
              if (options.dropPosition === 0){
                return false;
              }
              if (getPageCategory(options.dropNode?.key as any)){
                return false;
              }
            }else{
              if(options.dropNode.isLeaf){
                if (options.dropPosition === 0){
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