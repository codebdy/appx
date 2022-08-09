import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useShowError } from "../../../hooks/useShowError";
import { IPageList } from "../../../model";
import CategoryForm from "./CategoryForm";
import { useUpdateCategory } from "../hooks/useUpdateCategory";
import { useTranslation } from "react-i18next";
import { IListNode } from "../recoil/IListNode";

const EditCategoryDialog = memo((
  props: {
    category: IListNode,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { category, isModalVisible, onClose } = props;
  const { t } = useTranslation();
  
  const [form] = Form.useForm()
  const [update, { loading, error }] = useUpdateCategory({
    onCompleted: (data: IPageList) => {
      form.resetFields();
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback((values) => {
    form.validateFields().then((values) => {
      update(category.uuid, values.title)
    });
  }, [form, update, category.uuid]);

  return (
    <Modal
      title={t("Pages.EditCategory")}
      visible={isModalVisible}
      width={400}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <CategoryForm title={category.title} form={form} />
    </Modal>
  )
})

export default EditCategoryDialog;