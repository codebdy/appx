import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useSelectedAppUuid } from "../hooks/useSelectedAppUuid";
import { useCreateNewPackage } from './../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";

const RootAction = memo(() => {
  const appUuid = useSelectedAppUuid();
  const setPackages = useSetRecoilState(packagesState(appUuid));
  const createNewPackage = useCreateNewPackage(appUuid);
  const backup = useBackupSnapshot(appUuid);
  const handleAddPackage = useCallback(
    () => {
      backup();
      setPackages(packages => [...packages, createNewPackage()]);
    },
    [backup, setPackages, createNewPackage],
  );

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <FolderAddOutlined />,
          label: getLocalMessage("model.AddPackage"),
          key: '0',
          onClick: e=>{
            e.domEvent.stopPropagation();
            handleAddPackage();
          }
        },
        {
          icon: <DownloadOutlined />,
          label: getLocalMessage("model.ExportModel"),
          key: '1',
        },
        {
          icon: <ImportOutlined />,
          label: getLocalMessage("model.ImportModel"),
          key: '2',
        },
      ]}
    />
  ), [handleAddPackage]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default RootAction;