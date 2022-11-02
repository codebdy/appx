import { MoreOutlined, EditOutlined, DeleteOutlined, LoadingOutlined, CopyOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useDeletePage } from "../../hooks/useDeletePage";
import { IPage } from "~/model";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { useTranslation } from "react-i18next";
import { useUpsertPage } from "../../hooks/useUpsertPage";
import { useLazyQueryPage } from "~/AppDesigner/hooks/useLazyQueryPage";
import { createUuid } from "~/shared";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";

const PageActions = memo((
  props: {
    page: IPage,
    onVisibleChange: (visible: boolean) => void,
    onEdit: () => void,
  }
) => {
  const { page, onVisibleChange, onEdit } = props;
  const appId = useEdittingAppId()
  const { t } = useTranslation();
  const [remove, { loading, error }] = useDeletePage({
    onCompleted: () => {
      onVisibleChange(false);
    }
  });

  const [upsert, { loading: upserting, error: upsertError }] = useUpsertPage({
    onCompleted: () => {
      onVisibleChange(false);
    }
  });

  const [query, { loading: quering, error: queryError }] = useLazyQueryPage({
    onCompleted: (page: IPage) => {
      upsert({ ...page, id: undefined, uuid: createUuid(), app: { sync: { id: appId } }, title: page.title + t("OfCopy") })
    }
  });

  useShowError(error || upsertError || queryError);

  const handleEdit = useCallback(() => {
    onEdit();
    onVisibleChange(false);
  }, [onEdit, onVisibleChange]);

  const handleDelete = useCallback(() => {
    remove(page.id);
  }, [page, remove]);

  const handleClone = useCallback(() => {
    query(page.id)
  }, [page, query]);

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
          icon: <CopyOutlined />,
          label: t("Clone"),
          key: '2',
          onClick: (e => {
            e.domEvent.stopPropagation();
            handleClone();
          })
        },
        {
          icon: <DeleteOutlined />,
          label: t("Delete"),
          key: '3',
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
          loading || upserting || quering ?
            <LoadingOutlined />
            : <MoreOutlined color="inherit" />
        }

      </Button>
    </Dropdown>
  )
})

export default PageActions;