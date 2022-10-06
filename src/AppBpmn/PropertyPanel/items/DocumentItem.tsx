import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

export const DocumentItem = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t("Model.ElementDocumentation")}
      name="documentation"
    >
      <Input.TextArea rows={3} />
    </Form.Item>
  )
}