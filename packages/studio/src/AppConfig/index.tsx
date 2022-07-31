import React, { useState } from "react"
import { memo } from "react"
import { Layout } from 'antd';
import ConifgHeader from "./ConifgHeader";
import { Outlet, useParams } from "react-router-dom";
import { useApp } from "../hooks/useApp";
import { useShowError } from './../hooks/useShowError';

const { Content } = Layout;

const AppConfig = memo(() => {
  const [activeKey, setActiveKey] = useState<string>("app")
  const { appUuid } = useParams();
  const { data, error } = useApp(appUuid)

  useShowError(error);

  return (
    <Layout className="rx-studio">
      <ConifgHeader app={data?.oneApp} activeKey={activeKey} onChange={setActiveKey} />
      <Content className='content'>
        <Outlet />
      </Content>
    </Layout>
  )
})

export default AppConfig;