import { DownloadOutlined, ImportOutlined, MoreOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useExportJson } from "../hooks/useExportJson";
import { useTranslation } from "react-i18next";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { useImportJson } from "../hooks/useImportJson";
import { useCreateNewCode } from "../hooks/useCreateNewCode";

export const OrchestrationRootAction = memo(() => {
  const appId = useEdittingAppId();

  const expotJson = useExportJson(appId);
  const importJson = useImportJson(appId);
  const { t } = useTranslation();
  const createNewCode = useCreateNewCode(appId);

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  const handleAddCode = useCallback(
    () => {
      createNewCode();
    },
    [createNewCode]
  );


  const menu = useMemo(() => (
    <Menu
      onClick={(info) => info.domEvent.stopPropagation()}
      items={[
        {
          icon: <PlusSquareOutlined />,
          label: t("AppUml.Add"),
          key: '1',
          onClick: e => e.domEvent.stopPropagation(),
          children: [
            {
              label: t("AppUml.AddQuery"),
              key: '12',
              onClick: e => {
                e.domEvent.stopPropagation();
                //addClass(StereoType.Abstract);
              },
            },
            {
              label: t("AppUml.AddMutaion"),
              key: '13',
              onClick: e => {
                e.domEvent.stopPropagation();
                //addClass(StereoType.Enum);
              },
            },
            {
              label: t("AppUml.AddCode"),
              key: '11',
              onClick: e => {
                e.domEvent.stopPropagation();
                handleAddCode();
              }
            },
          ]
        },
        {
          icon: <DownloadOutlined />,
          label: t("AppUml.ExportOrchestration"),
          key: '2',
          onClick: expotJson
        },
        {
          icon: <ImportOutlined />,
          label: t("AppUml.ImportOrchestration"),
          key: '3',
          onClick: importJson,
        },
      ]}
    />
  ), [expotJson, importJson, t]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})
