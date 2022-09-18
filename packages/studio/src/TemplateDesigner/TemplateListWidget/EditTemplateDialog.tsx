import { Form, Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ImageUploader } from "../../components";
import { MultiLangInput } from "../../components/pc";
import { useShowError } from "../../hooks/useShowError";
import { ITemplate } from "../../model";
import { useUpsertTemplate } from "../hooks/useUpsertTemplate";

export const EditTemplateDialog = memo((
  props: {
    template?: ITemplate,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { template, isModalVisible, onClose } = props;
  const [form] = Form.useForm()

  useEffect(()=>{
    form.setFieldsValue(template)
  }, [form, template]);

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
      upsert({ ...template as any, ...values });
    });
  }, [form, template, upsert]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Modal
      title={template ? t("Templates.EidtTemplate") : t("Templates.NewTemplate")}
      open={isModalVisible}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <Form
        name="editPage"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        form={form}
        initialValues={{ title: template?.title || "" }}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      >
        <Form.Item
          label={t("Templates.TemplateName")}
          name="title"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("Templates.TemplateName")} />
        </Form.Item>
        < Form.Item
          label={t("Templates.Image")}
          name="imageUrl"
        >
          <ImageUploader title={t("Upload")} maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
