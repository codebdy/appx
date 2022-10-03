import { MoreOutlined, EditOutlined, DeleteOutlined, LockOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { IProcess } from "../../model/process";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

export const ProcessAction = memo((
  props: {
    process: IProcess,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { process, onEdit, onVisibleChange } = props;
  const appUuid = useEdittingAppUuid();
  // const getPagcage = useGetPackage(appUuid)
  // const deleteDiagram = useDeleteDiagram(appUuid)
  const { t } = useTranslation();

  const handleDelete = useCallback(() => {
    //deleteDiagram(diagram.uuid)
    onVisibleChange(false);
  }, [onVisibleChange, process.id]);

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
    <Dropdown
      overlay={menu}
      onOpenChange={onVisibleChange}
      trigger={['click']}
    >
      <Button type="text" shape='circle' size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined/>
      </Button>
    </Dropdown>
  )
})
