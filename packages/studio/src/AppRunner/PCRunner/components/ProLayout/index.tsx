import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import "./style.less";
import MenuSider from './MenuSider';

const { Header, Content, Footer } = Layout;

const menuWidth = 260;
const menuCollapsedWidth = 56;

const ProLayout = memo((
  props: {
    logo?: React.ReactNode,
    title?: React.ReactNode
  }
) => {
  const { logo, title } = props;
  const [collapsed, setCollapsed] = useState(false);

  const handleTrigger = useCallback(() => {
    setCollapsed(collapsed => !collapsed)
  }, [])

  return (
    <Layout className='appx-pro-layout'>
      <MenuSider
        menuWidth={menuWidth}
        menuCollapsedWidth={menuCollapsedWidth}
        collapsed={collapsed}
        logo = {logo}
        title={title}
      />
      <Layout className="site-layout">
        <Header className="site-layout-background toolbar header-toolbar" >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: handleTrigger,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
});

export default ProLayout;