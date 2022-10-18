import React from "react"
import { memo } from "react"
import { Layout } from 'antd';
import EntryHeader from "./EntryHeader";
import { Outlet, useParams } from "react-router-dom";
import { useQueryApp } from "../hooks/useQueryApp";
import { useShowError } from '../hooks/useShowError';
import AppRoot from "../shared/AppRoot";
import { DESIGNER_TOKEN_NAME } from "../consts";

const { Content } = Layout;

const AppEntry = memo(() => {
  const { appUuid } = useParams();
  const { app, error } = useQueryApp(appUuid)

  useShowError(error);

  return (
    <AppRoot tokenName={DESIGNER_TOKEN_NAME}>
      <Layout className="rx-studio">
        <EntryHeader app={app} />
        <Content className='content'>
          <Outlet />
        </Content>
      </Layout>
    </AppRoot>
  )
})

export default AppEntry;