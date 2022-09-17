import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useShowError } from "../../hooks/useShowError";
import { ITemplate } from "../../model";
import { useUpsertTemplate } from "../hooks/useUpsertTemplate";

export const EditTemplateDialog = memo((
  props: {
    template: ITemplate,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { template, isModalVisible, onClose } = props;
  const [form] = Form.useForm()
  const [upsert, { loading, error }] = useUpsertTemplate({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });
  const { t } = useTranslation();
  useShowError(error);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values: any) => {
      upsert({ ...template as any, ...values});
    });
  }, [form, template, upsert]);

  return (
    <Modal
      title={t("Templates.EidtTemplate")}
      visible={isModalVisible}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <PageForm page={page} categories={categories} form={form} />
    </Modal>
  )
})
