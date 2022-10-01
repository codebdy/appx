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
        className="method-input-modal"
        title={t("AppUml.ConfigArgs")}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <div className="input-modal-body args-input-body">

        </div>
      </Modal>
    </>
  )
})