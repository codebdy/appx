import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import ConifgHeader from "./ConifgHeader";
import { Outlet, useParams } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { useShowError } from './../hooks/useShowError';
import AppRoot from "../shared/AppRoot";

const { Content } = Layout;

const AppConfig = memo(() => {
  const { appUuid } = useParams();
  const { app, error } = useApp(appUuid)

  useShowError(error);

  return (
    <AppRoot>
      <Layout className="rx-studio">
        <ConifgHeader app={app} />
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </AppRoot>
  )
})

export default AppConfig;