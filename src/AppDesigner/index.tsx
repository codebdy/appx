import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import DesignerHeader from "./DesignerHeader";
import { Outlet, useParams } from "react-router-dom";
import { useQueryApp } from "../hooks/useQueryApp";
import { useShowError } from '~/hooks/useShowError';
import { SYSTEM_APP_ID } from "~/consts";

const { Content } = Layout;

const AppDesigner = memo(() => {
  const { appId = SYSTEM_APP_ID } = useParams();
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