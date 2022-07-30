import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import AppFooter from "../AppManager/AppFooter";
import DeviceList from "./DeviceList";
import ConifgHeader from "./ConifgHeader";
import { useParams } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { useShowError } from './../hooks/useShowError';

const { Content } = Layout;

const AppConfig = memo(() => {
  const { appUuid } = useParams();
  const { data, loading, error } = useApp(appUuid)

  useShowError(error);

  return (
    <Layout className="rx-studio">
      <ConifgHeader app={data?.oneApp} />
      <Content className='content'>
        <div className='content-inner'>
          <DeviceList loading={loading} app={data?.oneApp} />
          <AppFooter />
        </div>
      </Content>
    </Layout>
  )
})

export default AppConfig;