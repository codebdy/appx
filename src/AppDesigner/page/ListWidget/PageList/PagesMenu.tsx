import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { memo } from 'react';
const menu = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
        key: '0',
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item
          </a>
        ),
        key: '1',
      },
    ]}
  />
);

export const PagesMenu = memo(() => {
  return (
    <Dropdown overlay={menu} trigger={["click", "hover"]}>
      <Button type="text" shape='circle' size='small' icon={<MoreOutlined />} />
    </Dropdown>
  )
});
