import { Menu, MenuProps } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import "./style.less"
import { AppManagerRoutes } from "../AppManager/AppHeader";
import SvgIcon from "../common/SvgIcon";
import { ListConentLayout } from "../common/ListConentLayout";
import { CloudServerOutlined } from "@ant-design/icons";

export enum MonitorRoutes {
  ServerStatus = "server-status",
  Logs = "logs",
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

export const MonitorCenter = memo(() => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const matchString = useMemo(() => {
    return `/${AppManagerRoutes.Auth}/*`
  }, [])
  const match = useMatch(matchString)

  const items: MenuProps['items'] = useMemo(() => [
    getItem(t("Monitor.ServerStatus"),
      MonitorRoutes.ServerStatus,
      <CloudServerOutlined style={{ fontSize: 16 }} />,
      null,
    ),
    getItem(t("Monitor.Logs"),
      MonitorRoutes.Logs,
      <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 968 968">
          <path d="M311.2 288H682v64H311.2zM311.2 480H682v64H311.2zM311.2 672H682v64H311.2z" p-id="4858"></path><path d="M960 512c0-59.4-39.5-109.1-92.7-123.4V192c0-52.9-41.6-96-92.7-96H218.5c-51.1 0-92.7 43.1-92.7 96v160H64v64h61.8v192H64v64h61.8v160c0 52.9 41.6 96 92.7 96h556.1c51.1 0 92.7-43.1 92.7-96V635.4c53.2-14.3 92.7-64 92.7-123.4zM774.6 864H218.5c-17 0-30.9-14.4-30.9-32V672h61.8v-64h-61.8V416h61.8v-64h-61.8V192c0-17.6 13.8-32 30.9-32h556.1c17 0 30.9 14.4 30.9 32v196.6c-53.2 14.3-92.7 64-92.7 123.4s39.5 109.1 92.7 123.4V832c0 17.6-13.8 32-30.9 32z m61.8-288c-34.1 0-61.8-28.7-61.8-64s27.7-64 61.8-64c34.1 0 61.8 28.7 61.8 64s-27.7 64-61.8 64z" p-id="4859"></path>
        </svg>
      </SvgIcon>,
      [],
    ),
  ], []);

  const onClick: MenuProps['onClick'] = useCallback(e => {
    navigate(e.key)
  }, [navigate]);

  const activeKey = useMemo(() => {
    return match?.params?.["*"] || MonitorRoutes.ServerStatus
  }, [match])

  return (
    <ListConentLayout
      className="monitor-board"
      list={
        <Menu
          key={activeKey}
          style={{ flex: 1 }}
          onClick={onClick}
          activeKey={activeKey}
          mode="inline"
          items={items}
        />
      }
    >
      <Outlet />
    </ListConentLayout>
  )
})