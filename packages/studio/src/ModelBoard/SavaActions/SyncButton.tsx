import { DownloadOutlined, DownOutlined, ImportOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import React, { memo, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { getLocalMessage } from '../../locales/getLocalMessage';
import { useSelectedAppUuid } from '../hooks/useSelectedAppUuid';
import { changedState } from '../recoil/atoms';

const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};


const SyncButton = memo(() => {
  const appUuid = useSelectedAppUuid();
  const changed = useRecoilValue(changedState(appUuid))
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
    <Dropdown.Button disabled={changed}  overlay={menu} placement="bottom" icon={<DownOutlined />}>
      {getLocalMessage("Publish")}
    </Dropdown.Button>
  )
});

export default SyncButton;