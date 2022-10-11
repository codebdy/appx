import { MoreOutlined, EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { DiagramMeta } from "../../meta/DiagramMeta";
import { useGetPackage } from "../../hooks/useGetPackage";
import { useDeleteDiagram } from "../../hooks/useDeleteDiagram";
import { SYSTEM_APP_UUID } from "../../../consts";
import { useEdittingAppUuid } from "../../../hooks/useEdittingAppUuid";
import { CodeMeta } from "../../meta/CodeMeta";

const CodeAction = memo((
  props: {
    code: CodeMeta,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { code, onEdit, onVisibleChange } = props;
  const appUuid = useEdittingAppUuid();
  const getPagcage = useGetPackage(appUuid)
  const deleteDiagram = useDeleteDiagram(appUuid)
  const { t } = useTranslation();

  const handleDelete = useCallback(() => {
    deleteDiagram(code.uuid)
    onVisibleChange(false);
  }, [deleteDiagram, onVisibleChange, code.uuid]);

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
    getPagcage(code.packageUuid)?.sharable && appUuid !== SYSTEM_APP_UUID ?
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

export default CodeAction;