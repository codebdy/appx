import { Button, Spin, Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./index.less"
import { DataNode } from 'antd/lib/tree';
import { EditOutlined } from '@ant-design/icons';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreatePageDialog from './CreatePageDialog';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nodesState, pagesState } from './recoil/atoms';
import { useDesingerKey } from '../../context';
import { ListNodeType } from './recoil/IListNode';
import { useGetPage } from './hooks/useGetPage';

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title:
      <div className='tree-node-label'>
        <div>首页</div>
        <div>
          <Button className='no-border' shape='circle' size='small'>
            <EditOutlined />
          </Button>
        </div>
      </div>,
    key: '0-0',
    isLeaf: true
  },
  {
    title: '列表页',
    key: '0-1',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: '表单页',
    key: '0-2',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];
const PageListWidget = memo(() => {
  const key = useDesingerKey();
  const setPages = useSetRecoilState(pagesState(key));
  const [nodes, setNodes] = useRecoilState(nodesState(key));
  const getPage = useGetPage(key);

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const node of nodes){
      if (node.nodeType === ListNodeType.Page){
        const page = getPage(node.pageId)
        dataNodes.push({
          title: page?.title,
          key: node.pageId,
          isLeaf: true,
        })        
      } else if(node.nodeType === ListNodeType.Category){
        dataNodes.push({
          title: node.title,
          key: node.uuid,
          children:node?.children.map((childId)=>{
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
    <Spin spinning={false}>
      <div className='page-list-shell'>
        <div className="page-list-action">
          <CreateCategoryDialog />
          <CreatePageDialog />
        </div>
        <DirectoryTree
          className='page-list-tree'
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