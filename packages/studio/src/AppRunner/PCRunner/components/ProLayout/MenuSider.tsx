import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { memo } from 'react';
import clx from "classnames";
const { Sider } = Layout;

function getItem(label?: string, key?: string, icon?: any, children?: any, type?: any) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
  ]),
];

const MenuSider = memo((
  props: {
    menuWidth?: string | number,
    menuCollapsedWidth?: string | number,
    collapsed?: boolean,
  }
) => {
  const{menuWidth, menuCollapsedWidth, collapsed} = props;


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
          <svg style={{ width: "40px", height: "40px" }} viewBox="0 0 24 24">
            <defs>
              <linearGradient id="logo_color" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a29e6" />
                <stop offset="90%" stopColor="#f155c3" />
                <stop offset="100%" stopColor="#3a29e6" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#logo_color)" }}
              d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z"
            />
          </svg>
          <div className='logo-title'>
            Appx
          </div>

        </div>
        <Menu
          className='nav-menu'
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            }, {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
    </>
  );
});

export default MenuSider;