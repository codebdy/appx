import { Layout } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import "./style.less";
import MenuSider from './MenuSider';
import ProHeader from './ProHeader';

const { Content, Footer } = Layout;

export const menuWidth = 260;
export const menuCollapsedWidth = 56;

const ProLayout = memo((
  props: {
    logo?: React.ReactNode,
    title?: React.ReactNode,
    menu?: React.ReactNode,
    children?: React.ReactNode,
    fixedHeader?: boolean,
    header?: React.ReactNode,
    footer?: React.ReactNode,
  }
) => {
  const { logo, title, menu, children, fixedHeader, header, footer } = props;
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
          {header}
        </ProHeader>
        <Content>
          {children}
        </Content>
        {
          footer && <Footer>{footer}</Footer>
        }
      </Layout>
    </Layout>
  );
});

export default ProLayout;