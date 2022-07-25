import { FolderAddOutlined, DownloadOutlined, ImportOutlined, MoreOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { useCreateNewPackage } from './../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { classesState, packagesState } from "../recoil/atoms";
import { PackageMeta } from "../meta/PackageMeta";
import { useBackupSnapshot } from './../hooks/useBackupSnapshot';
import { diagramsState } from './../recoil/atoms';
import { useDeletePackage } from './../hooks/useDeletePackage';

const PackageAction = memo((
  props: {
    pkg: PackageMeta,
    onEdit: () => void,
  }
) => {
  const { pkg, onEdit } = props;
  const appId = useSelectedAppId()
  const setPackages = useSetRecoilState(packagesState(appId))
  const createNewPackage = useCreateNewPackage(appId)
  const backup = useBackupSnapshot(appId)
  const deletePackage = useDeletePackage(appId)
  const handleAddPackage = useCallback(
    () => {
      backup();
      setPackages(packages => [...packages, createNewPackage()]);
    },
    [setPackages],
  )

  const handleDelete = useCallback(() => {
    deletePackage(pkg.uuid)
  }, [setPackages]);

  const menu = useMemo(() => (
    <div style={{ backgroundColor: "#000" }}>
      <Menu
        items={[
          {
            icon: <FileAddOutlined />,
            label: getLocalMessage("model.AddDiagram"),
            key: '0',
          },
          {
            icon: <PlusSquareOutlined />,
            label: getLocalMessage("model.AddClass"),
            key: '1',
            onClick: e => e.domEvent.stopPropagation(),
            children: [
              {
                label: getLocalMessage("model.AddEntity"),
                key: '1',
                onClick: e => e.domEvent.stopPropagation(),
              },
              {
                label: getLocalMessage("model.AddAbstract"),
                key: '2',
                onClick: e => e.domEvent.stopPropagation(),
              },
              {
                label: getLocalMessage("model.AddEnum"),
                key: '3',
                onClick: e => e.domEvent.stopPropagation(),
              },
              {
                label: getLocalMessage("model.AddValueObject"),
                key: '4',
                onClick: e => e.domEvent.stopPropagation(),
              },
            ]
          },
          {
            icon: <EditOutlined />,
            label: getLocalMessage("Edit"),
            key: '5',
            onClick: e => {
              e.domEvent.stopPropagation();
              onEdit()
            }
          },
          {
            icon: <DeleteOutlined />,
            label: getLocalMessage("Delete"),
            key: '6',
            onClick: e => {
              e.domEvent.stopPropagation();
              handleDelete()
            }
          },
        ]}
      />
    </div>
  ), [handleAddPackage]);

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button className='no-border' shape='circle' size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default PackageAction;