import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { memo, useCallback, useMemo } from "react"
import { ID } from "../../../shared";

const PageActions = memo((
  props: {
    pageId: ID,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { pageId, onVisibleChange, onEdit } = props;
  const handleEdit = useCallback(() => {
    onEdit();
    onVisibleChange(false);
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {

  }, []);

  const menu = useMemo(() => (
    <Menu
      onClick={e => e.domEvent.stopPropagation()}
      items={[
        {
          icon: <EditOutlined />,
          label: getLocalMessage("Edit"),
          key: '1',
          onClick: (e => {
            e.domEvent.stopPropagation();
            handleEdit();
          })
        },
        {
          icon: <DeleteOutlined />,
          label: getLocalMessage("Delete"),
          key: '2',
          onClick: (e => {
            e.domEvent.stopPropagation();
            onVisibleChange(false);
            handleDelete();
          })
        },
      ]}
    />
  ), [handleDelete, handleEdit, onVisibleChange]);

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      onVisibleChange={onVisibleChange}
    >
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  )
})

export default PageActions;