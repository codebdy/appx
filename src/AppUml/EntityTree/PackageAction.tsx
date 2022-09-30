import { MoreOutlined, EditOutlined, DeleteOutlined, FileAddOutlined, PlusSquareOutlined, ShareAltOutlined, LockOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useSetRecoilState } from 'recoil';
import { classesState, selectedDiagramState } from "../recoil/atoms";
import { PackageMeta } from "../meta/PackageMeta";
import { useDeletePackage } from './../hooks/useDeletePackage';
import { useCreateNewClass } from "../hooks/useCreateNewClass";
import { useCreateNewDiagram } from "../hooks/useCreateNewDiagram";
import { StereoType } from "../meta/ClassMeta";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useTranslation } from "react-i18next";
import { SYSTEM_APP_UUID } from "../../consts";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

const PackageAction = memo((
  props: {
    pkg: PackageMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { pkg, onEdit, onVisibleChange } = props;
  const appUuid = useEdittingAppUuid();
  const deletePackage = useDeletePackage(appUuid)
  const createNewClass = useCreateNewClass(appUuid);
  const createNewDiagram = useCreateNewDiagram(appUuid);
  const setClasses = useSetRecoilState(classesState(appUuid));
  const backupSnapshot = useBackupSnapshot(appUuid);
  const { t } = useTranslation();
  
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
            label: t("AppUml.AddDiagram"),
            key: '0',
            onClick: e => {
              e.domEvent.stopPropagation();
              handleAddDiagram();
            }
          },
          {
            icon: <PlusSquareOutlined />,
            label: t("AppUml.AddClass"),
            key: '1',
            onClick: e => e.domEvent.stopPropagation(),
            children: [
              {
                label: t("AppUml.AddEntity"),
                key: '1',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Entity);
                },
              },
              {
                label: t("AppUml.AddAbstract"),
                key: '2',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Abstract);
                },
              },
              {
                label: t("AppUml.AddEnum"),
                key: '3',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.Enum);
                },
              },
              {
                label: t("AppUml.AddValueObject"),
                key: '4',
                onClick: e => {
                  e.domEvent.stopPropagation();
                  addClass(StereoType.ValueObject);
                },
              },
              {
                label: t("AppUml.AddService"),
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
            label: t("Share"),
            key: '5',
            onClick: e => {
              e.domEvent.stopPropagation();
              //onEdit();
              onVisibleChange(false);
            }
          },
          {
            icon: <EditOutlined />,
            label: t("Edit"),
            key: '6',
            onClick: e => {
              e.domEvent.stopPropagation();
              onEdit();
              onVisibleChange(false);
            }
          },
          {
            icon: <DeleteOutlined />,
            label: t("Delete"),
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
  ), [addClass, handleAddDiagram, handleDelete, onEdit, onVisibleChange, t]);

  return (
    pkg.sharable && appUuid !== SYSTEM_APP_UUID ?
      <Button type="text" shape='circle' size='small'>
        <LockOutlined />
      </Button>
      :
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