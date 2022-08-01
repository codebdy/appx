import { Form, Modal } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";
import { IListNode } from "./recoil/IListNode";

const CreatePageModal = memo((
  props:{
    category?: IListNode,
    isModalVisible: boolean,
    onClose:()=>void,
  }
) => {
  const {category, isModalVisible, onClose} = props;
  const [form] = Form.useForm()


  const handleConfirm = useCallback((values: any) => {
    form.validateFields();
  }, [form]);

  const handleCancel = useCallback((values: any) => {
    form.resetFields();
    onClose()
  }, [form, onClose]);


  return (
    <Modal
      title={getLocalMessage("pages.NewPage")}
      visible={isModalVisible}
      width={580}
      cancelText={getLocalMessage("Cancel")}
      okText={getLocalMessage("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
    >
      <PageForm form={form} />
    </Modal>
  )
})

export default CreatePageModal;