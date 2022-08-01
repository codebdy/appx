import { MoreOutlined, FileAddOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { memo, useCallback, useMemo } from "react"

const PageActions = memo((
  props: {
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { onVisibleChange } = props;
  const handleAdd = useCallback(() => {

  }, []);

  const handleEdit = useCallback(() => {

  }, []);

  const handleDelete = useCallback(() => {

  }, []);

  const menu = useMemo(() => (
    <Menu
      items={[
        {
          icon: <FileAddOutlined />,
          label: getLocalMessage("pages.NewPage"),
          key: '0',
          onClick: (e => {
            e.domEvent.stopPropagation();
            onVisibleChange(false);
            handleAdd();
          })
        },
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
  ), [handleAdd, handleDelete, handleEdit, onVisibleChange]);

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