import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu } from "antd"
import React, { memo } from "react"
import { useMe } from "../enthooks/hooks/useMe";
import { getLocalMessage } from "../locales/getLocalMessage";

const AvatarMenu = memo(() => {
  useMe()
  const menu = (
    <Menu>
      <Menu.Item key="changepPassword"
        icon={<LockOutlined />}
      >
        {getLocalMessage("ChangePassword")}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        {getLocalMessage("Logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
      <Avatar className="avatar" icon={<UserOutlined />} />
    </Dropdown>
  )
})

export default AvatarMenu