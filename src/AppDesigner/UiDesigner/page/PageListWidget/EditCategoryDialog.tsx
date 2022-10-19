import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useShowError } from "~/hooks/useShowError";
import CategoryForm from "./CategoryForm";
import { useTranslation } from "react-i18next";
import { IPageCategory } from "packages/studio/src/model";
import { useUpsertCategory } from "../../hooks/useUpsertCategory";

const EditCategoryDialog = memo((
  props: {
    category: IPageCategory,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { category, isModalVisible, onClose } = props;
  const { t } = useTranslation();

  const [form] = Form.useForm()
  const [update, { loading, error }] = useUpsertCategory({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback((values) => {
    form.validateFields().then((values) => {
      update({ id: category.id, title: values.title })
    });
  }, [form, update, category.id]);

  return (
    <Modal
      title={t("Pages.EditCategory")}
      open={isModalVisible}
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