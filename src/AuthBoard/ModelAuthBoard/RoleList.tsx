import { UserOutlined } from "@ant-design/icons";
import { List, Menu, MenuProps } from "antd";
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

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
  getItem('Navigation One', 'sub1', <UserOutlined />),

  getItem('Navigation Two', 'sub2', <UserOutlined />),

  getItem('Navigation Three', 'sub4', <UserOutlined />),
];

export const RoleList = memo(() => {
  const { t } = useTranslation();
  return (
    <div className="right-border role-list">
      <div className="bottom-border roles-title">
        {t("Auth.Role List")}
      </div>
      <div className="role-list-body">
        <Menu
          mode="inline"
          items={items}
        />
      </div>

    </div>
  )
})