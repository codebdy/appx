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
    logo?: React.ReactNode,
    title?: React.ReactNode,
  }
) => {
  const { menuWidth, menuCollapsedWidth, collapsed, logo, title } = props;


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