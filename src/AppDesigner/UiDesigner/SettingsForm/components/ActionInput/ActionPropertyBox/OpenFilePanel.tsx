import { Form, Input, Switch } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const OpenFilePanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={"Accept"}
        name="accept"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("Action.Multiple")}
        valuePropName="checked"
        name="multiple"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label={t("Action.VariableName")}
        name="variableName"
      >
        <Input />
      </Form.Item>
    </>
  )
})