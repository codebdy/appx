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
    title?: React.ReactNode,
    menu?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  const { logo, title, menu, children } = props;
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
        logo={logo}
        title={title}
      >
        {menu}
      </MenuSider>
      <Layout className="site-layout">
        <Header className="site-layout-background toolbar header-toolbar" >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: handleTrigger,
          })}
        </Header>
        <Content className="site-layout-background">
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
});

export default ProLayout;