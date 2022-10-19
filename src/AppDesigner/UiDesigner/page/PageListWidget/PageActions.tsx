import { MoreOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { ID } from "~/shared";
import { useDeletePage } from "../../hooks/useDeletePage";
import { IPage } from "model";
import { useShowError } from "~/hooks/useShowError";
import { useTranslation } from "react-i18next";

const PageActions = memo((
  props: {
    pageId: ID,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { pageId, onVisibleChange, onEdit } = props;
  const { t } = useTranslation();
  const [remove, { loading, error }] = useDeletePage({
    onCompleted: (data: IPage) => {
      onVisibleChange(false);
    }
  });

  useShowError(error);

  const handleEdit = useCallback(() => {
    onEdit();
    onVisibleChange(false);
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(pageId);
  }, [pageId, remove]);

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
            : <MoreOutlined color="inherit" />
        }

      </Button>
    </Dropdown>
  )
})

export default PageActions;