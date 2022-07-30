import { DownloadOutlined, DownOutlined, ImportOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import React, { memo, useMemo } from 'react';
import { getLocalMessage } from '../../locales/getLocalMessage';

const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};


const SyncButton = memo(() => {
  const menu = useMemo(() => (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          icon: <DownloadOutlined />,
          label: getLocalMessage("model.ExportModel"),
          key: '2',
        },
        {
          icon: <ImportOutlined />,
          label: getLocalMessage("model.ImportModel"),
          key: '3',
        },
      ]}
    />
  ), []);
  
  return (
    <Dropdown.Button overlay={menu} placement="bottom" icon={<DownOutlined />}>
      {getLocalMessage("Publish")}
    </Dropdown.Button>
  )
});

export default SyncButton;