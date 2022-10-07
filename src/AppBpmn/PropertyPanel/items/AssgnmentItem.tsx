import { Form, Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
//import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view";

export const AssgnmentItem = () => {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item
        label={t("AppBpmn.ElementDocumentation")}
        name="documentation"
      >
        <Input />
      </Form.Item>
    </>
  )
}