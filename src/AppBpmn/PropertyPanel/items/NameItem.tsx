import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const NameItem = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t("Name")}
      name="name"
    >
      <Input.TextArea rows={2} />
    </Form.Item>
  )
}