import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo, useState } from "react"
import { useCreateNewPackage } from './../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useExportJson } from "../hooks/useExportJson";
import { useTranslation } from "react-i18next";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { PackageDialog } from "./PackageLabel/PackageDialog";
import { PackageMeta } from "../meta/PackageMeta";

const RootAction = memo(() => {
  const appUuid = useEdittingAppUuid();
  const [newPackage, setNewPackage] = useState<PackageMeta>();
  const setPackages = useSetRecoilState(packagesState(appUuid));
  const createNewPackage = useCreateNewPackage(appUuid);
  const backup = useBackupSnapshot(appUuid);
  const expotJson = useExportJson(appUuid);
  const { t } = useTranslation();
  const handleAddPackage = useCallback(
    () => {
      setNewPackage(createNewPackage());
    },
    [setNewPackage],
  );

  const handleClose = useCallback(() => {
    setNewPackage(undefined);
  }, [])

  const handleConfirm = useCallback((pkg: PackageMeta) => {
    backup();
    setPackages(packages => [...packages, pkg]);
    setNewPackage(undefined);
  }, [backup, setPackages, createNewPackage])

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <FolderAddOutlined />,
          label: t("AppUml.AddPackage"),
          key: '0',
          onClick: e => {
            e.domEvent.stopPropagation();
            handleAddPackage();
          }
        },
        {
          icon: <DownloadOutlined />,
          label: t("AppUml.ExportModel"),
          key: '1',
          onClick: expotJson
        },
        {
          icon: <ImportOutlined />,
          label: t("AppUml.ImportModel"),
          key: '2',
        },
      ]}
    />
  ), [expotJson, handleAddPackage, t]);

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
          <MoreOutlined />
        </Button>
      </Dropdown>
      {
        newPackage &&
        <PackageDialog
          pkg={newPackage}
          open={!!newPackage}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      }

    </>
  )
})

export default RootAction;