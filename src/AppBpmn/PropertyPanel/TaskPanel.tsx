import { Form, Input } from "antd"
import React, { useEffect } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const TaskPanel = memo((props: {
  element?: any
}) => {
  const { element } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("id", element?.businessObject?.id || '')
    form.setFieldValue("name", element?.businessObject?.name || '')
  }, [element?.businessObject])

  return (
    <div className="property-pannel-form">
      <Form
        name="taskform"
        labelCol={{ span: 8 }}
        labelAlign="left"
        layout="vertical"
        wrapperCol={{ span: 24 }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Name")}
          name="name"
        >
          <Input.TextArea rows={2} />
        </Form.Item>
      </Form>
    </div>
  )
})