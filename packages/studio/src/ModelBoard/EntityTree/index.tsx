import React, { memo } from "react";
import { Graph } from "@antv/x6";
import { Button, Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import { EditOutlined } from "@ant-design/icons";

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;

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

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        //borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        width: "280px",
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 8,
        }}
      >
        <DirectoryTree
          //className='page-list-tree'
          // allowDrop={()=>{
          //   return true
          // }}
          // draggable={
          //   ()=>{
          //     return true
          //   }
          // }
          //defaultExpandAll
          //onSelect={onSelect}
          treeData={treeData}
        />
      </div>
    </div>
  );
});
