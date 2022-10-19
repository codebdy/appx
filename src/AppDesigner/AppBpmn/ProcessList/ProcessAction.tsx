import { MoreOutlined, EditOutlined, DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next";
import { IProcess } from "~/model/process";

import { useDeleteProcess } from "../hooks/useDeleteProcess";
import { useShowError } from "~/hooks/useShowError";

export const ProcessAction = memo((
  props: {
    process: IProcess,
    onEdit: () => void,
    onVisibleChange: (visible: boolean) => void,
  }
) => {
  const { process, onEdit, onVisibleChange } = props;
  const [doDelete, { error, loading }] = useDeleteProcess({
    onCompleted: () => {
      onVisibleChange(false);
    }
  });
  useShowError(error);
  const { t } = useTranslation();

  const handleDelete = useCallback(() => {
    doDelete(process.id);
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
        {
          loading
            ?
            <LoadingOutlined />
            :
            <MoreOutlined />
        }

      </Button>
    </Dropdown>
  )
})
