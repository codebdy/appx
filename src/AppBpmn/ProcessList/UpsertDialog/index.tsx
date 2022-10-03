import { PlusOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import React, { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { ID } from "../../../shared"

export const UpsertDialog = memo((
  props: {
    processId?: ID,
  }
) => {
  const { processId } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        shape="circle"
        type="text"
        size="small"
        icon={<PlusOutlined />}
        onClick={handleOpen}
      ></Button>

      <Modal
        title={t(processId ? "AppBpmn.EidtProcess" : "AppBpmn.AddProcess")}
        open={open}
        width={580}
        cancelText={t("Cancel")}
        okText={t("Confirm")}
        onCancel={handleClose}
        onOk={handleConfirm}
        confirmLoading={false}
        wrapProps={
          {
            onClick: (e) => {
              console.log("哈哈")
              e.stopPropagation()
            },
          }
        }
      >
      </Modal>
    </>
  )
})