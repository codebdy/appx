import { Form, Input } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { JavaScriptInput } from "../JavaScriptInput"

export const JavaScriptPanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Action.JavaScript")}
        name="javaScript"
      >
        <JavaScriptInput />
      </Form.Item>
      <Form.Item
        label={t("Action.AffectedEntities")}
        name="affectedEntities"
        help={t("Action.CommaSplit")}
      >
        <Input />
      </Form.Item>
    </>
  )
})