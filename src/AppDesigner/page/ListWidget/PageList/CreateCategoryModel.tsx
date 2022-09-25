import { Button, Modal } from "antd";
import SvgIcon from "../../../../common/SvgIcon";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useForm } from "antd/lib/form/Form";
import { useUpsertCategory } from "../../../hooks/useUpsertCategory";
import { useShowError } from "../../../../hooks/useShowError";
import CategoryForm from "./CategoryForm";
import { useTranslation } from "react-i18next";

const CreateCategoryDialog = memo((props: {
  open?: boolean,
  onClose?: () => void,
}) => {
  const {open, onClose} = props;
  const [form] = useForm()
  const { t } = useTranslation();
  const [create, { loading, error }] = useUpsertCategory({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });

  useShowError(error);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form]);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values) => {
      create({ title: values.title })
    });
  }, [create, form]);

  return (
    <Modal
      title={t("Pages.NewCategory")}
      open={open}
      width={400}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <CategoryForm form={form} />
    </Modal>
  )
})

export default CreateCategoryDialog;