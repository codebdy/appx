import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React from 'react';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            创建版本
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            导出
          </a>
        ),
        icon: <SmileOutlined />,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            导入
          </a>
        ),
      },
      {
        key: '4',
        label: '发布',
      },
    ]}
  />
);

export const Operate: React.FC = () => (
  <Dropdown overlay={menu}>
    <Button type="text" onClick={e => e.preventDefault()}>
      <Space>
        操作
        <DownOutlined style={{ fontSize: 14 }} />
      </Space>
    </Button>
  </Dropdown>
);
