import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ListConentLayout } from "../common/ListConentLayout"
import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { BellOutlined, FileSearchOutlined, FundOutlined, NodeIndexOutlined, SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { AppManagerRoutes } from "../AppManager/AppHeader";
import "./style.less";

export enum ConfigsRoutes {
  SystemConfig = "system-config",
  ProcessEngine = "porcess-engine",
  NotificationEngine = "notification-engine",
  SearchEngine = "search-engine",
  ReportEngine = "report-engine",
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

export const ConfigCenter = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const items: MenuProps['items'] = useMemo(() => [
    getItem(t("Configs.ProcessEngine"), ConfigsRoutes.ProcessEngine, <NodeIndexOutlined />, null),
    getItem(t("Configs.NotificationEngine"), ConfigsRoutes.NotificationEngine, <BellOutlined />, null),
    getItem(t("Configs.SearchEngine"), ConfigsRoutes.SearchEngine, <FileSearchOutlined />, null),
    getItem(t("Configs.ReportEngine"), ConfigsRoutes.ReportEngine, <FundOutlined />, null),
    getItem(t("Configs.SystemConfig"), AppManagerRoutes.SystemConfig, <SettingOutlined />, null),
  ], []);

  const onClick: MenuProps['onClick'] = useCallback(e => {
    navigate(e.key)
    console.log('click ', e);
  }, [navigate]);

  return (
    <ListConentLayout
      className="appx-configs"
      list={
        <Menu
          style={{ flex: 1 }}
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