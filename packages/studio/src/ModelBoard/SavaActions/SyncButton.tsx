import { DownloadOutlined, DownOutlined, ImportOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import React, { memo, useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { getLocalMessage } from '../../locales/getLocalMessage';
import { useExportJson } from '../hooks/useExportJson';
import { useSelectedAppUuid } from '../hooks/useSelectedAppUuid';
import { changedState } from '../recoil/atoms';

const SyncButton = memo(() => {
  const appUuid = useSelectedAppUuid();
  const changed = useRecoilValue(changedState(appUuid))
  const expotJson = useExportJson(appUuid)
  
  const handleMenuClick = useCallback((e) => {
    if(e.key === "export"){
      expotJson()
    }
  }, [expotJson]);

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