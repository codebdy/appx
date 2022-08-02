import { Button, Spin, Tree } from 'antd';
import React, { memo, useCallback, useEffect } from 'react';
import "./index.less"
import { DataNode } from 'antd/lib/tree';
import { EditOutlined } from '@ant-design/icons';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreatePageDialog from './CreatePageDialog';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nodesState, pagesState } from './recoil/atoms';
import { useDesingerKey } from '../../context';
import { ListNodeType } from './recoil/IListNode';
import { useGetPage } from './hooks/useGetPage';
import { usePageList } from './hooks/usePageList';
import { useInit } from './hooks/useInit';
import { useShowError } from '../../../hooks/useShowError';
import CategoryLabel from './CategoryLabel';
import { usePages } from './hooks/usePages';

const { DirectoryTree } = Tree;

const PageListWidget = memo(() => {
  const key = useDesingerKey();
  const setPages = useSetRecoilState(pagesState(key));
  const nodes = useRecoilValue(nodesState(key));
  const getPage = useGetPage(key);
  const { pageList, loading, error } = usePageList()
  const { pages, loading: pagesLoading, error: pagesError } = usePages();
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
          title: page?.title,
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
              title: page?.title,
              key: node.pageId,
              isLeaf: true,
            }
          })
        })
      }
    }
    return dataNodes
  }, [getPage, nodes])

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
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
          selectedKeys={[]}
          allowDrop={() => {
            return true
          }}
          draggable={
            () => {
              return true
            }
          }
          //defaultExpandAll
          onSelect={onSelect}
          treeData={getTreeData()}
        />
      </div>
    </Spin>
  );
});

export default PageListWidget;