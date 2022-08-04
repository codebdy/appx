import { ColumnHeightOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import React from "react"
import { memo } from "react"

const HeightMenu = memo(() => {
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
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip title="密度">
        <Button shape="circle" size="large" type="text" onClick={e => e.preventDefault()}>
          <ColumnHeightOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  )

})

export default HeightMenu