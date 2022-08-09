import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import React, { memo } from 'react';

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
  },
  {
    title: 'parent 1-0',
    key: '0-0-0',
  },
  {
    title: 'parent 1-1',
    key: '0-0-1',
    children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
  },
  {
    title: 'leaf',
    key: '0-0-0-0',
    disableCheckbox: true,
  },
  {
    title: 'leaf',
    key: '0-0-0-1',
  },
];

const PagesTree = memo(() => {

  return (
    <Tree
      className="draggable-tree"
      defaultExpandAll
      blockNode
      treeData={treeData}
    />
  );
});

export default PagesTree;