import { MoreOutlined, EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { DiagramMeta } from "../../meta/DiagramMeta";
import { useGetPackage } from "../../hooks/useGetPackage";
import { useDeleteDiagram } from "../../hooks/useDeleteDiagram";
import { SYSTEM_APP_ID } from "~/consts";
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";

const DiagramAction = memo((
  props: {
    diagram: DiagramMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { diagram, onEdit, onVisibleChange } = props;
  const appId = useEdittingAppId();
  const getPagcage = useGetPackage(appId)
  const deleteDiagram = useDeleteDiagram(appId)
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
    getPagcage(diagram.packageUuid)?.sharable && appId !== SYSTEM_APP_ID ?
      <Button type="text" shape='circle' size='small'>
        <LockOutlined />
      </Button>
      :
      <Dropdown
        overlay={menu}
        onOpenChange={onVisibleChange}
        trigger={['click']}
      >
        <Button type="text" shape='circle' size='small' onClick={e => e.stopPropagation()}>
          <MoreOutlined />
        </Button>
      </Dropdown>
  )
})

export default DiagramAction;