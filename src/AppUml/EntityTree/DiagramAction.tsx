import { MoreOutlined, EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { DiagramMeta } from "../meta/DiagramMeta";
import { useGetPackage } from "../hooks/useGetPackage";
import { useDeleteDiagram } from "../hooks/useDeleteDiagram";
import { SYSTEM_APP_UUID } from "../../consts";
import { useSelectedAppUuid } from "../../plugin-sdk/contexts/appRoot";

const DiagramAction = memo((
  props: {
    diagram: DiagramMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { diagram, onEdit, onVisibleChange } = props;
  const appUuid = useSelectedAppUuid()
  const getPagcage = useGetPackage(appUuid)
  const deleteDiagram = useDeleteDiagram(appUuid)
  const { t } = useTranslation();

  const handleDelete = useCallback(() => {
    deleteDiagram(diagram.uuid)
    onVisibleChange(false);
  }, [deleteDiagram, onVisibleChange, diagram.uuid]);

  const menu = useMemo(() => (
    <div style={{ backgroundColor: "#000" }}>
      <Menu
        items={[
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
  ), [handleDelete, onEdit, onVisibleChange, t]);

  return (
    getPagcage(diagram.packageUuid)?.sharable && appUuid !== SYSTEM_APP_UUID ?
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

export default DiagramAction;