import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import DesignerHeader from "./DesignerHeader";
import { Outlet } from "react-router-dom";
import { useQueryApp } from "../hooks/useQueryApp";
import { useShowError } from '~/hooks/useShowError';
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";
import AppRoot from "~/shared/AppRoot";
import { DESIGNER_TOKEN_NAME } from "~/consts";

const { Content } = Layout;

const AppDesigner = memo(() => {
  const appId = useEdittingAppId();
  const { app, error } = useQueryApp(appId)

  useShowError(error);

  return (
    app &&
    <AppRoot app={app} tokenName={DESIGNER_TOKEN_NAME}>
      <Layout className="rx-studio">
        <DesignerHeader app={app} />
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </AppRoot>
  )
})

export default AppDesigner;