import { Form, Modal } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";

const CreatePageModal = memo((
  props:{
    isModalVisible: boolean,
    onClose:()=>void,
  }
) => {
  const {isModalVisible, onClose} = props;
  const [form] = Form.useForm()


  const handleConfirm = useCallback((values: any) => {
    form.validateFields();
  }, [form]);

  return (
    <Modal
      title={getLocalMessage("pages.NewPage")}
      visible={isModalVisible}
      width={580}
      cancelText={getLocalMessage("Cancel")}
      okText={getLocalMessage("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
    >
      <PageForm form={form} />
    </Modal>
  )
})

export default CreatePageModal;