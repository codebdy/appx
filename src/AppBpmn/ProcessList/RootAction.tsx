import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useSetRecoilState } from 'recoil';
import { useTranslation } from "react-i18next";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

const RootAction = memo(() => {
  const appUuid = useEdittingAppUuid();
  //const setPackages = useSetRecoilState(packagesState(appUuid));
  //const createNewPackage = useCreateNewPackage(appUuid);
  //const backup = useBackupSnapshot(appUuid);
  //const expotJson = useExportJson(appUuid);
  const { t } = useTranslation();
  const handleAddPackage = useCallback(
    () => {
      //backup();
      //setPackages(packages => [...packages, createNewPackage()]);
    },
    [],
  );

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
          //onClick: expotJson
        },
        {
          icon: <ImportOutlined />,
          label: t("AppUml.ImportModel"),
          key: '2',
        },
      ]}
    />
  ), [t]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default RootAction;