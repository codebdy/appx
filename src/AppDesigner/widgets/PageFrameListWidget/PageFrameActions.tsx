import { MoreOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { ID } from "../../../shared";
import { useShowError } from "../../../hooks/useShowError";
import { IPageFrame } from "../../../model";
import { useDeletePageFrame } from "../../hooks/useDeletePageFrame";

const PageFrameActions = memo((
  props: {
    pageFrameId: ID,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { pageFrameId, onVisibleChange, onEdit } = props;
  const { t } = useTranslation();
  const [remove, { loading, error }] = useDeletePageFrame({
    onCompleted: (data: IPageFrame) => {
      onVisibleChange(false);
    }
  });

  useShowError(error);

  const handleEdit = useCallback(() => {
    onEdit();
    onVisibleChange(false);
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(pageFrameId);
  }, [pageFrameId, remove]);

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
      onOpenChange={onVisibleChange}
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

export default PageFrameActions;