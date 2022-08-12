import { Layout } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import "./style.less";
import MenuSider from './MenuSider';
import ProHeader from './ProHeader';

const { Content, Footer } = Layout;

const menuWidth = 260;
const menuCollapsedWidth = 56;

const ProLayout = memo((
  props: {
    logo?: React.ReactNode,
    title?: React.ReactNode,
    menu?: React.ReactNode,
    children?: React.ReactNode,
    fixedHeader?: boolean,
  }
) => {
  const { logo, title, menu, children, fixedHeader } = props;
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
        <ProHeader
          collapsed={collapsed}
          fixed={fixedHeader}
          onTrigger={handleTrigger}
        >
        </ProHeader>
        <Content>
          wewfef
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
});

export default ProLayout;