
import { Layout } from 'antd';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppParams } from '~/plugin-sdk';
import DesignerHeader from "../DesignerHeader";

const { Content } = Layout;
export const AppDesignBoard = memo(() => {
  const { app } = useAppParams();
  return (
    <Layout className="rx-studio">
      <DesignerHeader app={app} />
      <Content className='content'>
        <Outlet />
      </Content>
    </Layout>
  )
})