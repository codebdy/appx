import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";
import { useUpsertPage } from "../../hooks/useUpsertPage";
import { useShowError } from "~/hooks/useShowError";
import { useTranslation } from "react-i18next";
import { IPageCategory } from "~/model";
import { createUuid, ID } from "~/shared";

const CreatePageModal = memo((
  props: {
    categoryUuid?: string,
    categories: IPageCategory[],
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { categoryUuid, categories, isModalVisible, onClose } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [upsert, { loading, error }] = useUpsertPage({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values: any) => {
      if (values.categoryUuid) {
        upsert({ title: values.title, uuid: createUuid(), categoryUuid: values.categoryUuid });
      } else {
        upsert({ title: values.title, uuid: createUuid() });
      }
    });
  }, [upsert, form]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose()
  }, [form, onClose]);


  return (
    <Modal
      title={t("Pages.NewPage")}
      open={isModalVisible}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <PageForm categoryUuid={categoryUuid} categories={categories} form={form} />
    </Modal>
  )
})

export default CreatePageModal;