import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import DesignerHeader from "./DesignerHeader";
import { Outlet, useParams } from "react-router-dom";
import { useQueryApp } from "../hooks/useQueryApp";
import { useShowError } from '~/hooks/useShowError';
import AppRoot from "~/shared/AppRoot";
import { DESIGNER_TOKEN_NAME } from "../consts";

const { Content } = Layout;

const AppDesigner = memo(() => {
  const { appUuid } = useParams();
  const { app, error } = useQueryApp(appUuid)

  useShowError(error);

  return (
    <AppRoot tokenName={DESIGNER_TOKEN_NAME}>
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