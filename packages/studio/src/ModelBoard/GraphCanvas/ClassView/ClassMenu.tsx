import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';
import React, { memo, useState } from 'react';
import { useCallback } from 'react';

const ClassMenu = memo(() => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = useCallback((e) => {
    if (e.key === '3') {
      //setVisible(false);
    }
  }, []);

  const handleVisibleChange = useCallback((flag) => {
    setVisible(flag);
  }, []);

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Clicking me will not close the menu.',
          key: '1',
        },
        {
          label: 'Clicking me will not close the menu also.',
          key: '2',
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <Button
        style={{
          position: "absolute",
          right: 0,
          top: "-4px",
        }}
        shape="circle"
        type="text"
        onClick={(e) => e.preventDefault()}
      >
        <MenuOutlined />
      </Button>
    </Dropdown>
  );
});

export default ClassMenu;