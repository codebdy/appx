import { Form, Input } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const TaskPanel = memo((props: {
  element?: any
}) => {
  const { t } = useTranslation();

  return (
    <div className="property-pannel-form">
      <Form
        name="taskform"
        labelCol={{ span: 8 }}
        labelAlign="left"
        wrapperCol={{ span: 16 }}
        initialValues={{}}
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
          <Input />
        </Form.Item>
      </Form>
    </div>
  )
})