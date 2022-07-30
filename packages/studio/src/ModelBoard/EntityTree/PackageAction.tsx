import { MoreOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, PlusSquareOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useSelectedAppUuid } from "../hooks/useSelectedAppUuid";
import { useSetRecoilState } from 'recoil';
import { classesState, selectedDiagramState } from "../recoil/atoms";
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
  const appUuid = useSelectedAppUuid()
  const deletePackage = useDeletePackage(appUuid)
  const createNewClass = useCreateNewClass(appUuid);
  const createNewDiagram = useCreateNewDiagram(appUuid);
  const setClasses = useSetRecoilState(classesState(appUuid));
  const backupSnapshot = useBackupSnapshot(appUuid);
  const setSelectedDiagram = useSetRecoilState(
    selectedDiagramState(appUuid)
  );

  const handleDelete = useCallback(() => {
    deletePackage(pkg.uuid)
    onVisibleChange(false);
  }, [deletePackage, onVisibleChange, pkg.uuid]);

  const addClass = useCallback(
    (stereoType: StereoType) => {
      backupSnapshot();
      const newClass = createNewClass(stereoType, pkg.uuid);
      setClasses((classes) => [...classes, newClass]);
      onVisibleChange(false);
    },
    [backupSnapshot, createNewClass, onVisibleChange, pkg.uuid, setClasses]
  );

  const handleAddDiagram = useCallback(
    () => {
      backupSnapshot();
      const newDiagram = createNewDiagram(pkg.uuid);
      setSelectedDiagram(newDiagram.uuid);
      onVisibleChange(false);
    },
    [backupSnapshot, createNewDiagram, onVisibleChange, pkg.uuid, setSelectedDiagram]
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
                  addClass(StereoType.Entity);
                },
              },
              {
                label: getLocalMessage("model.AddAbstract"),
                key: '2',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Abstract);
                },
              },
              {
                label: getLocalMessage("model.AddEnum"),
                key: '3',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Enum);
                },
              },
              {
                label: getLocalMessage("model.AddValueObject"),
                key: '4',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.ValueObject);
                },
              },
              {
                label: getLocalMessage("model.AddService"),
                key: '5',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Service);
                },
              },
            ]
          },
          {
            icon: <ShareAltOutlined />,
            label: getLocalMessage("Share"),
            key: '5',
            onClick: e => {
              e.domEvent.stopPropagation();
              //onEdit();
              onVisibleChange(false);
            }
          },
          {
            icon: <EditOutlined />,
            label: getLocalMessage("Edit"),
            key: '6',
            onClick: e => {
              e.domEvent.stopPropagation();
              onEdit();
              onVisibleChange(false);
            }
          },
          {
            icon: <DeleteOutlined />,
            label: getLocalMessage("Delete"),
            key: '7',
            onClick: e => {
              e.domEvent.stopPropagation();
              handleDelete();
              onVisibleChange(false);
            }
          },
        ]}
      />
    </div>
  ), [addClass, handleAddDiagram, handleDelete, onEdit, onVisibleChange]);

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={onVisibleChange}
      trigger={['click']}
    >
      <Button type="text" shape='circle' size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default PackageAction;