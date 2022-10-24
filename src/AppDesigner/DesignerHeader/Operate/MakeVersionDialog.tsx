import { Form, Modal } from "antd";
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view";

export const MakeVersionDialog = memo((
  props: {
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { open, onOpenChange } = props;
  const { t } = useTranslation()
  const [form] = Form.useForm<any>();
  const handleOk = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange])
  return (
    <Modal
      title={t("Designer.CreateVersion")}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="makeVersion"
        labelWrap
        initialValues={{ title: "", description: "" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={t("Name")}
          name="version"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("Name")} />
        </Form.Item>
        <Form.Item
          label={t("Description")}
          name="description"
        >
          <MultiLangInput inline multiline title={t("Description")} />
        </Form.Item>
      </Form>
    </Modal>
  )
})