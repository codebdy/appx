import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import React from 'react';

const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const menu = (
  <Menu
    onClick={handleMenuClick}
    items={[
      {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
      },
      {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
      },
      {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
      },
    ]}
  />
);

const SyncButton = () => (
  <Dropdown.Button overlay={menu} placement="bottom" icon={<UserOutlined />}>
    发布
  </Dropdown.Button>
);

export default SyncButton;