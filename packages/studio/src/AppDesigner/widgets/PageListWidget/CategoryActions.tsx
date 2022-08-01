import { MoreOutlined, FileAddOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { memo, useCallback, useMemo } from "react"
import { useDeleteCategory } from "./hooks/useDeleteCategory";
import { useShowError } from "../../../hooks/useShowError";
import { IPageList } from "../../../model";
import { useInit } from "./hooks/useInit";

const CategoryActions = memo((
  props: {
    uuid: string,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { uuid, onVisibleChange, onEdit } = props;
  const init = useInit();

  const [remove, { loading, error }] = useDeleteCategory({
    onCompleted: (data: IPageList) => {
      onVisibleChange(false);
      init(data);
    }
  });

  useShowError(error);

  const handleAdd = useCallback(() => {

  }, []);

  const handleEdit = useCallback(() => {
    onVisibleChange(false);
    onEdit();
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(uuid)
  }, [remove, uuid]);

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
      disabled={loading}
    >
      <Button shape='circle' type="text" size='small' onClick={e => e.stopPropagation()}>
        {
          loading ?
            <LoadingOutlined />
            : <MoreOutlined />
        }

      </Button>
    </Dropdown>
  )
})

export default CategoryActions;