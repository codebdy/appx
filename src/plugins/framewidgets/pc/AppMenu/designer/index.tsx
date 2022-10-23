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
  getItem('Nav 1', 'sub1', <MailOutlined />),

  getItem('Nav 2', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
  ]),

  getItem('Nav 3', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
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