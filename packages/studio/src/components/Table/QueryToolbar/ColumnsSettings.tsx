import { SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import React from "react"
import { memo } from "react"

const ColumnsSettings = memo(() => {
  const menu = (
    <Menu
      selectedKeys={["1"]}
      style={{
        minWidth: 80,
      }}
      items={[
        {
          label: "默认",
          key: '0',
        },
        {
          label: "中等",
          key: '1',
        },
        {
          label: '紧凑',
          key: '3',
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} arrow>
      <Tooltip title="列设置">
        <Button shape="circle" size="large" type="text" onClick={e => e.preventDefault()}>
          <SettingOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  )

})

export default ColumnsSettings