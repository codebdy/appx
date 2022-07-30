import { DownloadOutlined, DownOutlined, ImportOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { getLocalMessage } from '../../locales/getLocalMessage';
import { useSelectedAppUuid } from '../hooks/useSelectedAppUuid';
import { changedState } from '../recoil/atoms';

const SyncButton = memo(() => {
  const appUuid = useSelectedAppUuid();
  const changed = useRecoilValue(changedState(appUuid))
  const handleMenuClick = useCallback((e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  }, []);

  const menu = useMemo(() => (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          icon: <DownloadOutlined />,
          label: getLocalMessage("model.ExportModel"),
          key: 'export',
        },
        {
          icon: <ImportOutlined />,
          label: getLocalMessage("model.ImportModel"),
          key: 'import',
        },
      ]}
    />
  ), [handleMenuClick]);

  return (
    <Dropdown.Button disabled={changed} overlay={menu} placement="bottom" icon={<DownOutlined />}>
      {getLocalMessage("Publish")}
    </Dropdown.Button>
  )
});

export default SyncButton;