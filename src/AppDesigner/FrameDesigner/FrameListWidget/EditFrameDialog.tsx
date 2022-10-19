import { Form, Modal } from "antd";
import React, { useCallback, useEffect } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import ImageUploader from "~/plugins/inputs/components/pc/ImageUploader/view";
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view";
import { useShowError } from "~/hooks/useShowError";
import { IPageFrame } from "~/model";
import { useUpsertPageFrame } from "../hooks/useUpsertPageFrame";

export const EditFrameDialog = memo((
  props: {
    frame?: IPageFrame,
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { frame, isModalVisible, onClose } = props;
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(frame)
  }, [form, frame]);

  const [upsert, { loading, error }] = useUpsertPageFrame({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });
  const { t } = useTranslation();
  useShowError(error);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values: any) => {
      upsert({ ...frame as any, ...values });
    });
  }, [form, frame, upsert]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Modal
      title={frame ? t("PageFrames.EidtPageFrame") : t("PageFrames.NewPageFrame")}
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
        initialValues={{ title: frame?.title || "" }}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      >
        <Form.Item
          label={t("PageFrames.FrameName")}
          name="title"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("PageFrames.FrameName")} />
        </Form.Item>
        < Form.Item
          label={t("PageFrames.Image")}
          name="imageUrl"
        >
          <ImageUploader title={t("Upload")} maxCount={1} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
