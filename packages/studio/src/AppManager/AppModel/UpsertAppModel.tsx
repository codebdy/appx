import { Form, message, Modal } from "antd"
import React from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { ImageUploader } from "../../components/ImageUploader";
import { MultiLangInput } from "../../components/pc";
import { useUpsertApp } from "../../hooks/useUpsertApp";
import { useShowError } from "../../hooks/useShowError";
import { IAppInput } from "../../model/input";
import { createUuid } from "../../shared";

export const UpsertAppModel = memo((
  props: {
    visible?: boolean,
    onClose?: () => void,
  }
) => {
  const { visible, onClose } = props;
  const [form] = Form.useForm<IAppInput>();
  const { t } = useTranslation();

  const [create, { loading, error }] = useUpsertApp({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
      onClose();
    }
  });

  useShowError(error);

  const handleOk = () => {
    form.validateFields().then((formData) => {
      create({ ...formData, uuid: createUuid() })
      form.setFieldsValue({ title: "", description: "" })
    }).catch((err) => {
      console.error("form validate error", err);
    });
  };


  return (
    <Modal
      title={t("AppManager.CreateApp")}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      okButtonProps={{
        loading: loading
      }}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form
        name="createApp"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ title: "", description: "" }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={t("AppName")}
          name="title"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("AppName")} />
        </Form.Item>

        {/* <Form.Item
        label={t("Description")}
        name="description"
      >
        <Input.TextArea />
      </Form.Item> */}

        < Form.Item
          label={t("Image")}
          name="imageUrl"
        >
          <ImageUploader title={t("Upload")} maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  )
})