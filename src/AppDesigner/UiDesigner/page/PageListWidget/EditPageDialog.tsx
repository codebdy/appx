import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";
import { IPage, IPageCategory } from "~/model";
import { useShowError } from "~/hooks/useShowError";
import { useTranslation } from "react-i18next";
import { useUpsertPage } from "../../hooks/useUpsertPage";

const EditPageDialog = memo((
  props: {
    page: IPage,
    categories?: IPageCategory[],
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { page, categories, isModalVisible, onClose } = props;
  const [form] = Form.useForm()
  const [upsert, { loading, error }] = useUpsertPage({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });
  const { t } = useTranslation();
  useShowError(error);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values: any) => {
      if (values.categoryId) {
        upsert({ ...page as any, title: values.title, category: { sync: { id: values.categoryId } } });
      } else {
        upsert({ ...page as any, title: values.title, category: { delete: true } });
      }
    });
  }, [form, page, upsert]);

  return (
    <Modal
      title={t("Pages.EidtPage")}
      open={isModalVisible}
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

export default EditPageDialog;