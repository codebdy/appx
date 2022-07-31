import { Button, Tree } from 'antd';
import React from 'react';
import "./index.less"
import { DataNode } from 'antd/lib/tree';
import { EditOutlined } from '@ant-design/icons';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreatePageDialog from './CreatePageDialog';

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
const PageListWidget = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div className='page-list-shell'>
      <div className="page-list-action">
        <CreateCategoryDialog />
        <CreatePageDialog />
      </div>
      <DirectoryTree
        className='page-list-tree'
        allowDrop={()=>{
          return true
        }}
        draggable={
          ()=>{
            return true
          }
        }
        //defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default PageListWidget;