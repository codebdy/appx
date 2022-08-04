import { SettingOutlined } from "@ant-design/icons";
import { Button, Popover, Tooltip, Tree, TreeProps } from "antd";
import { DataNode } from "antd/lib/tree";
import React from "react"
import { memo } from "react"

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
  },
  { title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' },
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

const ColumnsSettings = memo(() => {
  const handleCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  const content = (
    <Tree
      checkable
      draggable
      onCheck={handleCheck}
      treeData={treeData}
    />
  );
  return (
    <Popover
      content={content}
      title="Title"
      trigger="click"
      placement="bottom"
      overlayClassName ="table-column-settings"
    >
      <Tooltip title="列设置">
        <Button shape="circle" size="large" type="text" onClick={e => e.preventDefault()}>
          <SettingOutlined />
        </Button>
      </Tooltip>
    </Popover>
  )
})

export default ColumnsSettings