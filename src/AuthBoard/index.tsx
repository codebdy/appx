import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ListConentLayout } from "../common/ListConentLayout"
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BellOutlined, NodeIndexOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./style.less";

export enum AuthRoutes {
  UiAuth = "ui-auth",
  ModelAuth = "model-auth",
}

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

export const AuthBoard = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const items: MenuProps['items'] = useMemo(() => [
    getItem(t("Auth.UiAuth"), AuthRoutes.UiAuth, <NodeIndexOutlined />, null),
    getItem(t("Auth.ModelAuth"), AuthRoutes.ModelAuth, <BellOutlined />, null),
  ], []);

  const onClick: MenuProps['onClick'] = useCallback(e => {
    navigate(e.key)
    console.log('click ', e);
  }, [navigate]);

  return (
    <ListConentLayout
      className="appx-auth-board"
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