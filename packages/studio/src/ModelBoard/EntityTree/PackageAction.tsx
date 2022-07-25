import { MoreOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { useSetRecoilState } from 'recoil';
import { packagesState, classesState, selectedDiagramState } from "../recoil/atoms";
import { PackageMeta } from "../meta/PackageMeta";
import { useDeletePackage } from './../hooks/useDeletePackage';
import { useCreateNewClass } from "../hooks/useCreateNewClass";
import { useCreateNewDiagram } from "../hooks/useCreateNewDiagram";
import { StereoType } from "../meta/ClassMeta";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";

const PackageAction = memo((
  props: {
    pkg: PackageMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { pkg, onEdit, onVisibleChange } = props;
  const appId = useSelectedAppId()
  const setPackages = useSetRecoilState(packagesState(appId))
  const deletePackage = useDeletePackage(appId)
  const createNewClass = useCreateNewClass(appId);
  const createNewDiagram = useCreateNewDiagram(appId);
  const setClasses = useSetRecoilState(classesState(appId));
  const backupSnapshot = useBackupSnapshot(appId);
  const setSelectedDiagram = useSetRecoilState(
    selectedDiagramState(appId)
  );

  const handleDelete = useCallback(() => {
    deletePackage(pkg.uuid)
    onVisibleChange(false);
  }, [setPackages]);

  const addClass = useCallback(
    (stereoType: StereoType) => {
      backupSnapshot();
      const newClass = createNewClass(stereoType, pkg.uuid);
      setClasses((classes) => [...classes, newClass]);
      onVisibleChange(false);
    },
    [backupSnapshot, createNewClass, onVisibleChange, setClasses]
  );

  const handleAddDiagram = useCallback(
    () => {
      backupSnapshot();
      const newDiagram = createNewDiagram(pkg.uuid);
      setSelectedDiagram(newDiagram.uuid);
      onVisibleChange(false);
    },
    [backupSnapshot, createNewDiagram, onVisibleChange, setSelectedDiagram]
  );

  const menu = useMemo(() => (
    <div style={{ backgroundColor: "#000" }}>
      <Menu
        items={[
          {
            icon: <FileAddOutlined />,
            label: getLocalMessage("model.AddDiagram"),
            key: '0',
            onClick: e => {
              e.domEvent.stopPropagation();
              handleAddDiagram();
            }
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
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Entity)
                },
              },
              {
                label: getLocalMessage("model.AddAbstract"),
                key: '2',
                onClick: e =>  {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Abstract)
                },
              },
              {
                label: getLocalMessage("model.AddEnum"),
                key: '3',
                onClick: e =>  {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Enum)
                },
              },
              {
                label: getLocalMessage("model.AddValueObject"),
                key: '4',
                onClick: e =>  {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.ValueObject)
                },
              },
            ]
          },
          {
            icon: <EditOutlined />,
            label: getLocalMessage("Edit"),
            key: '5',
            onClick: e => {
              e.domEvent.stopPropagation();
              onEdit();
              onVisibleChange(false);
            }
          },
          {
            icon: <DeleteOutlined />,
            label: getLocalMessage("Delete"),
            key: '6',
            onClick: e => {
              e.domEvent.stopPropagation();
              handleDelete();
              onVisibleChange(false);
            }
          },
        ]}
      />
    </div>
  ), [handleDelete]);

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={onVisibleChange}
      trigger={['click']}
    >
      <Button className='no-border' shape='circle' size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default PackageAction;