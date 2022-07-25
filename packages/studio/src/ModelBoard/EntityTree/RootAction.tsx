import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useMemo } from "react"
import { getLocalMessage } from "../../locales/getLocalMessage";

const RootAction = memo(() => {
  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon:<FolderAddOutlined />,
          label: getLocalMessage("model.AddPackage"),
          key: '0',
        },
        {
          icon:<DownloadOutlined />,
          label: getLocalMessage("model.ExportModel"),
          key: '1',
        },
        {
          icon: <ImportOutlined />,
          label: getLocalMessage("model.ImportModel"),
          key: '2',
        },
      ]}
    />
  ), []);
  
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className='no-border' shape='circle' size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default RootAction;