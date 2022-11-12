import { DownloadOutlined, ImportOutlined, MoreOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useExportModelJson } from "../hooks/useExportModelJson";
import { useTranslation } from "react-i18next";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { useImportModelJson } from "../hooks/useImportModelJson";
import { useCreateNewCode } from "../hooks/useCreateNewCode";
import { useCreateNewOrchestration } from "../hooks/useCreateNewOrchestration";
import { MethodOperateType } from "../meta";

export const OrchestrationRootAction = memo(() => {
  const appId = useEdittingAppId();

  const expotJson = useExportModelJson(appId);
  const importJson = useImportModelJson(appId);
  const { t } = useTranslation();
  const createNewCode = useCreateNewCode(appId);
  const addOrchestration = useCreateNewOrchestration(appId);

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

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
                addOrchestration(MethodOperateType.Query);
              },
            },
            {
              label: t("AppUml.AddMutaion"),
              key: '13',
              onClick: e => {

                addOrchestration(MethodOperateType.Mutation);
              },
            },
            {
              label: t("AppUml.AddCode"),
              key: '11',
              onClick: e => {
                createNewCode();
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
  ), [expotJson, importJson, addOrchestration, createNewCode, t]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})
