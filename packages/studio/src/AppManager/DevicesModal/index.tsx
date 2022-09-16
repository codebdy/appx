import { Modal } from "antd";
import React, { useCallback } from "react"
import { memo } from "react"

export const DevicesModal = memo((
  props: {
    visible?: boolean,
    onClose?: () => void,
  }
) => {
  const { visible, onClose } = props;
  
  const handleCancel = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  const handleOk = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  return (
    <Modal title="Basic Modal" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
})