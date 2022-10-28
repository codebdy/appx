import React from "react"
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react"
import { IComponentProps } from "../view"
import { Menu, MenuProps } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import "../view/style.less"
import cls from "classnames";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Menu item 1', 'sub1', <MailOutlined />),
  getItem('Menu item 2', 'sub2', <AppstoreOutlined />,),
];

const ComponentDesigner: DnFC<IComponentProps> = observer((
  props
) => {
  const { className, ...other } = props;

  return (
    <Menu
      className={cls("app-menu", className)}
      {...other}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      items={items}
    />
  )
})

export default ComponentDesigner