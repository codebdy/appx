import { Modal } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback } from "react";
import { memo } from "react";
import { useForm } from "antd/lib/form/Form";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { useShowError } from "../../../hooks/useShowError";
import { IPageList } from "../../../model";
import { useInit } from "./hooks/useInit";
import CategoryForm from "./CategoryForm";

const EditCategoryDialog = memo((
  props:{
    isModalVisible: boolean,
    onClose: ()=>void,
  }
) => {
  const {isModalVisible, onClose} = props;

  const [form] = useForm()
  const init = useInit();
  const [create, { loading, error }] = useCreateCategory({
    onCompleted: (data: IPageList) => {
      init(data);
      form.resetFields();
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values) => {
      create(values.name)
    });
  }, [create, form]);

  return (
    <Modal
      title={getLocalMessage("pages.EditCategory")}
      visible={isModalVisible}
      width={400}
      cancelText={getLocalMessage("Cancel")}
      okText={getLocalMessage("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <CategoryForm form={form} />
    </Modal>
  )
})

export default EditCategoryDialog;