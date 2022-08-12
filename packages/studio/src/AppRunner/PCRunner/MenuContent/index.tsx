import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { memo } from "react";

const MenuContent = memo(() => {
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1',
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2',
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          }, {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3',
          },
        ]}
      />
    </>
  )
})

export default MenuContent;