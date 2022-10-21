import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import DesignerHeader from "./DesignerHeader";
import { Outlet } from "react-router-dom";
import { useQueryApp } from "../hooks/useQueryApp";
import { useShowError } from '~/hooks/useShowError';
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";

const { Content } = Layout;

const AppDesigner = memo(() => {
  const appId = useEdittingAppId();
  const { app, error } = useQueryApp(appId)

  useShowError(error);

  return (
    <Layout className="rx-studio">
      <DesignerHeader app={app} />
      <Content className='content'>
        <Outlet />
      </Content>
    </Layout>
  )
})

export default AppDesigner;