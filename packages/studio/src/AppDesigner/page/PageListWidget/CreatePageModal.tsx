import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";
import { useUpsertPage } from "../../hooks/useUpsertPage";
import { useShowError } from "../../../hooks/useShowError";
import { useTranslation } from "react-i18next";
import { IPageCategory } from "packages/studio/src/model";
import { ID } from "../../../shared";

const CreatePageModal = memo((
  props: {
    categoryId?: ID,
    categories: IPageCategory[],
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { categoryId, categories, isModalVisible, onClose } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [upsert, { loading, error }] = useUpsertPage({
    onCompleted: () => {
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values: any) => {
      upsert({ title: values.title, category: { sync: { id: values.categoryId } } });
    });
  }, [upsert, form]);

  const handleCancel = useCallback((values: any) => {
    form.resetFields();
    onClose()
  }, [form, onClose]);


  return (
    <Modal
      title={t("Pages.NewPage")}
      visible={isModalVisible}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <PageForm categoryId={categoryId} categories={categories} form={form} />
    </Modal>
  )
})

export default CreatePageModal;