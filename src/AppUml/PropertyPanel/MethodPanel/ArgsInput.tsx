import { Button, Modal } from "antd"
import React, { useCallback, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";

export const ArgsInput = memo(() => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false);
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [])
  return (
    <>
      <Button block onClick={showModal}>
        {t("AppUml.ConfigArgs")}
      </Button>
      <Modal
        className="args-input-modal"
        title={t("AppUml.ConfigArgs")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <div className="args-input-body">
          <div className="arg-list">

          </div>
          <Button type="dashed" block>
            {t("ADD")}
          </Button>
        </div>
      </Modal>
    </>
  )
})