import { Layout } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const handleScroll = useCallback((event: Event) => {
    const scrollRect = ref?.current?.getBoundingClientRect();
    if (scrollRect.y < 40) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll])


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
          scrolled={scrolled}
        >
          {header}
        </ProHeader>
        <Content ref = {ref}>
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