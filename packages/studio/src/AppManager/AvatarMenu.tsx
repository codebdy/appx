import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu } from "antd"
import React from "react"
import SvgIcon from "../common/SvgIcon";

const menu = (
  <Menu>
    <Menu.Item key="two"
      icon={<LockOutlined />}
    >
      修改密码
    </Menu.Item>
    <Menu.Item key="three" icon={<LogoutOutlined />}>
      退出
    </Menu.Item>
  </Menu>
);

const AvatarMenu = () => {
  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
      <Avatar className="avatar" src="https://joeschmoe.io/api/v1/random" icon={<UserOutlined />} />
    </Dropdown>
  )
}

export default AvatarMenu