import { Form } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view";


export const DocumentItem = () => {
  const { t } = useTranslation()
  return (
    <Form.Item
      label={t("Model.ElementDocumentation")}
      name="documentation"
    >
      <MultiLangInput inline multiline rows={3} />
    </Form.Item>
  )
}