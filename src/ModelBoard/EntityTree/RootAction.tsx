import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useCreateNewPackage } from './../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useExportJson } from "../hooks/useExportJson";
import { useTranslation } from "react-i18next";
import { useSelectedAppUuid } from "../../plugin-sdk/contexts/appRoot";

const RootAction = memo(() => {
  const appUuid = useSelectedAppUuid();
  const setPackages = useSetRecoilState(packagesState(appUuid));
  const createNewPackage = useCreateNewPackage(appUuid);
  const backup = useBackupSnapshot(appUuid);
  const expotJson = useExportJson(appUuid);
  const { t } = useTranslation();
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
          label: t("ModelBoard.AddPackage"),
          key: '0',
          onClick: e=>{
            e.domEvent.stopPropagation();
            handleAddPackage();
          }
        },
        {
          icon: <DownloadOutlined />,
          label: t("ModelBoard.ExportModel"),
          key: '1',
          onClick:expotJson
        },
        {
          icon: <ImportOutlined />,
          label: t("ModelBoard.ImportModel"),
          key: '2',
        },
      ]}
    />
  ), [expotJson, handleAddPackage, t]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default RootAction;