import { Layout } from 'antd';
import React, { memo } from 'react';
import clx from "classnames";
const { Sider } = Layout;

export const MenuSider = memo((
  props: {
    menuWidth?: string | number,
    menuCollapsedWidth?: string | number,
    collapsed?: boolean,
    logo?: React.ReactNode,
    title?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  const { menuWidth, menuCollapsedWidth, collapsed, logo, title, children } = props;

  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={menuCollapsedWidth}
        width={menuWidth}
      ></Sider>
      <Sider
        className='sider-nav'
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={menuCollapsedWidth}
        width={menuWidth}
      >
        <div className={clx("logo toolbar", { collapsed })}>
          {logo}
          <div className='logo-title'>
            {title}
          </div>
        </div>
        <div className='nav-menu'>
          {children}
        </div>
      </Sider>
    </>
  );
});
