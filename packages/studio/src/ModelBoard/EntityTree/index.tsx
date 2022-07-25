import React, { memo } from "react";
import { Graph } from "@antv/x6";
import { Button, Tree } from "antd";
import { DataNode } from "antd/lib/tree";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import SvgIcon from "../../common/SvgIcon";
import { getLocalMessage } from "../../locales/getLocalMessage";

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;

  const { DirectoryTree } = Tree;

  const treeData: DataNode[] = [
    {
      icon: <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M907.8 226.4l0.1-0.2L526 98.2l-13.4-4.5c-0.4-0.1-0.8-0.1-1.2 0l-13.3 4.5-381.8 128 0.1 0.2c-7.7 3.2-13.4 10.7-13.4 20v509.4c0 0.7 0.4 1.4 1.1 1.7l382 162.1 13.2 5.6 12.1 5.1c0.5 0.2 1 0.2 1.4 0l12.1-5.1 13.2-5.6 382-162.1c0.7-0.3 1.1-0.9 1.1-1.7V246.3c-0.1-9.2-5.8-16.7-13.4-19.9zM483.5 862L156 723c-0.7-0.3-1.1-0.9-1.1-1.7V294.9c0-1.3 1.3-2.2 2.5-1.7l327.5 139c0.7 0.3 1.1 0.9 1.1 1.7v426.4c0 1.3-1.3 2.2-2.5 1.7z m27.8-475L201.9 255.6c-1.5-0.7-1.5-2.9 0.1-3.4l310.1-103.9 310 103.9c1.6 0.5 1.7 2.7 0.1 3.4L512.7 387c-0.4 0.2-1 0.2-1.4 0zM868 723L540.5 862c-1.2 0.5-2.5-0.4-2.5-1.7V433.9c0-0.7 0.4-1.4 1.1-1.7l327.5-139c1.2-0.5 2.5 0.4 2.5 1.7v426.4c0 0.7-0.4 1.4-1.1 1.7z" p-id="16762"></path>
        </svg>
      </SvgIcon>,
      title:
        <div className='tree-node-label'>
          <div>{getLocalMessage("model.DomainModel")}</div>
          <div>
            <Button className='no-border' shape='circle' size='small'>
              <MoreOutlined />
            </Button>
          </div>
        </div>,
      key: '0-0',

      children: [
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
      ]
    },

  ];

  return (

    <div
      style={{
        flex: 1,
        overflow: "auto",
        padding: 8,
      }}
    >
      <DirectoryTree
        selectedKeys={[]}
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

  );
});
