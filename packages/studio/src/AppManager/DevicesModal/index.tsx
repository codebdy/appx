import { Modal } from "antd";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";

export const DevicesModal = memo((
  props: {
    visible?: boolean,
    onClose?: () => void,
  }
) => {
  const { visible, onClose } = props;
  const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  return (
    <Modal
      title={t("System.Devices")}
      visible={visible}
      onCancel={handleCancel}
      footer = {null}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
})