import { Form, Modal } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";
import { IListNode } from "./recoil/IListNode";
import { useCreatePage } from "./hooks/useCreatePage";
import { useShowError } from "../../../hooks/useShowError";

const CreatePageModal = memo((
  props:{
    category?: IListNode,
    isModalVisible: boolean,
    onClose:()=>void,
  }
) => {
  const {category, isModalVisible, onClose} = props;
  const [form] = Form.useForm();
  const [createPage, {loading, error}] = useCreatePage({
    onCompleted:()=>{
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values: any)=>{
      createPage(values.title, values.categoryUuid);
    });
  }, [createPage, form]);

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
      confirmLoading = {loading}
    >
      <PageForm categoryUuid={category?.uuid} form={form} />
    </Modal>
  )
})

export default CreatePageModal;