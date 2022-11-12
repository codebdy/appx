import { DownloadOutlined, ImportOutlined, MoreOutlined, CodeOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo, useState } from "react"
import { useCreateNewPackage } from '../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { codesState, packagesState, selectedCodeState, selectedUmlDiagramState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useExportJson } from "../hooks/useExportJson";
import { useTranslation } from "react-i18next";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { PackageDialog } from "./PackageLabel/PackageDialog";
import { PackageMeta } from "../meta/PackageMeta";
import { useImportJson } from "../hooks/useImportJson";
import { useCreateNewCode } from "../hooks/useCreateNewCode";
import { CodeDialog } from "./CodeLabel/CodeDialog";
import { CodeMeta } from "../meta";

export const OrchestrationRootAction = memo(() => {
  const appId = useEdittingAppId();
  const [newPackage, setNewPackage] = useState<PackageMeta>();
  const [newCode, setNewCode] = useState<CodeMeta>();
  const setPackages = useSetRecoilState(packagesState(appId));
  const setCodes = useSetRecoilState(codesState(appId));
  const createNewPackage = useCreateNewPackage(appId);
  const backup = useBackupSnapshot(appId);
  const expotJson = useExportJson(appId);
  const importJson = useImportJson(appId);
  const { t } = useTranslation();
  const createNewCode = useCreateNewCode(appId);
  const setSelectedCode = useSetRecoilState(selectedCodeState(appId));
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(appId)
  );

  const handleNoneAction = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

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

  const handleAddCode = useCallback(
    () => {
      setNewCode(createNewCode());
    },
    [createNewCode]
  );

  const handleCodeClose = useCallback(() => {
    setNewCode(undefined)
  }, []);

  const handleCodeConfirm = useCallback((code: CodeMeta) => {
    backup();
    setCodes((cods) => [...cods, code]);
    setSelectedCode(code.uuid);
    setSelectedDiagram(undefined);
    setNewCode(undefined);
  }, [backup, setCodes, setSelectedCode, setSelectedDiagram]);

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
          label: t("AppUml.ExportModel"),
          key: '2',
          onClick: expotJson
        },
        {
          icon: <ImportOutlined />,
          label: t("AppUml.ImportModel"),
          key: '3',
          onClick: importJson,
        },
      ]}
    />
  ), [expotJson, importJson, handleAddPackage, t]);

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button shape='circle' type="text" size='small' onClick={handleNoneAction}>
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
      {
        newCode &&
        <CodeDialog
          code={newCode}
          open={!!newCode}
          onClose={handleCodeClose}
          onConfirm={handleCodeConfirm}
        />
      }
    </>
  )
})
