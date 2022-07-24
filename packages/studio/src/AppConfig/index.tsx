import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import AppFooter from "../AppManager/AppFooter";
import DeviceList from "./DeviceList";
import ConifgHeader from "./ConifgHeader";
import { useParams } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { useShowError } from './../hooks/useShowError';

const { Header, Content } = Layout;

const AppConfig = memo(() => {
  const { appId } = useParams();
  const { data: app, loading, error } = useApp(appId)

  useShowError(error);

  return (
    <Layout className="rx-studio">
      <ConifgHeader app={app} />
      <Content className='content'>
        <div className='content-inner'>
          <DeviceList loading={loading} app={app} />
          <AppFooter />
        </div>
      </Content>
    </Layout>
  )
})

export default AppConfig;