import { Form, Modal } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import PageForm from "./PageForm";
import { IPage } from "../../../model";
import { useUpsertPage } from "../hooks/useUpsertPage";
import { useShowError } from "../../../hooks/useShowError";
import { useTranslation } from "react-i18next";

const EditPageDialog = memo((
  props: {
    page: IPage,
    categoryUuid: string,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { page, categoryUuid, isModalVisible, onClose } = props;
  const [form] = Form.useForm()
  const [upsert, { loading, error }] = useUpsertPage({
    onCompleted: () => {
      onClose();
    }
  });
  const { t } = useTranslation();
  useShowError(error);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values: any) => {
      upsert({ ...page as any, title: values.title }, values.categoryUuid);
    });
  }, [form, page, upsert]);

  return (
    <Modal
      title={t("Pages.EidtPage")}
      visible={isModalVisible}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <PageForm page={page} categoryUuid={categoryUuid} form={form} />
    </Modal>
  )
})

export default EditPageDialog;