import { MoreOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { IUiFrame } from "~/model";
import { ID } from "~/shared";
import { useDeletePageFrame } from "../hooks/useDeletePageFrame";

const FrameActions = memo((
  props: {
    frameId: ID,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { frameId, onVisibleChange, onEdit } = props;
  const { t } = useTranslation();
  const [remove, { loading, error }] = useDeletePageFrame({
    onCompleted: (data: IUiFrame) => {
      onVisibleChange(false);
    }
  });

  useShowError(error);

  const handleEdit = useCallback(() => {
    onEdit();
    onVisibleChange(false);
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(frameId);
  }, [frameId, remove]);

  const menu = useMemo(() => (
    <Menu
      onClick={e => e.domEvent.stopPropagation()}
      items={[
        {
          icon: <EditOutlined />,
          label: t("Edit"),
          key: '1',
          onClick: (e => {
            e.domEvent.stopPropagation();
            handleEdit();
          })
        },
        {
          icon: <DeleteOutlined />,
          label: t("Delete"),
          key: '2',
          onClick: (e => {
            e.domEvent.stopPropagation();
            handleDelete();
          })
        },
      ]}
    />
  ), [handleDelete, handleEdit, t]);

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

export default FrameActions;