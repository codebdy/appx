import { Button, Tree } from 'antd';
import SvgIcon from '../../../common/SvgIcon';
import React, { memo } from 'react';
import "./index.less"
import { DataNode } from 'antd/lib/tree';
import { getMessage, TextWidget } from '../TextWidget';
import { EditOutlined } from '@ant-design/icons';

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
        <Button
          icon={
            <SvgIcon>
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
              </svg>
            </SvgIcon>
          }
        >
          {getMessage("pages.NewCategory")}
        </Button>
        <Button
          type='primary'
          icon={
            <SvgIcon>
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H14L20 8V13.09C19.67 13.04 19.34 13 19 13S18.33 13.04 18 13.09V9H13V4H6V20H13.09C13.21 20.72 13.46 21.39 13.81 22M23 18H20V15H18V18H15V20H18V23H20V20H23V18Z" />
              </svg>
            </SvgIcon>
          }
        >
          {getMessage("pages.NewPage")}
        </Button>
      </div>
      <DirectoryTree
        className='page-list-tree'
        // allowDrop={()=>{
        //   return true
        // }}
        // draggable={
        //   ()=>{
        //     return true
        //   }
        // }
        //defaultExpandAll
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
};

export default PageListWidget;