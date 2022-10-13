import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { Outlet } from "react-router-dom"
import { ListConentLayout } from "../common/ListConentLayout"
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BellOutlined, FileSearchOutlined, NodeIndexOutlined, SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { AppManagerRoutes } from "../AppManager/AppHeader";

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

export const ConfigCenter = memo(() => {
  const { t } = useTranslation();
  const items: MenuProps['items'] = useMemo(() => [
    getItem(t("Configs.ProcessEngine"), 'sub1', <NodeIndexOutlined />, [
      getItem('Item 1', 'g1', null),
      getItem('Item 2', 'g2', null),
    ]),

    getItem(t("Configs.NotificationEngine"), 'sub2', <BellOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem(t("Configs.SearchEngine"), 'sub4', <FileSearchOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem(t("Configs.SystemConfig"), AppManagerRoutes.SystemConfig, <SettingOutlined />, null),
  ], []);

  const onClick: MenuProps['onClick'] = useCallback(e => {
    console.log('click ', e);
  }, []);

  return (
    <ListConentLayout
      list={
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
      }
    >
      <Outlet />
    </ListConentLayout>
  )
})