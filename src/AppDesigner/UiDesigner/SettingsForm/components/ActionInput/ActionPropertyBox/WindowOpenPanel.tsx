import { Form, Input } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const WindowOpenPanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Action.RouteOrLink")}
        name="route"
      >
        <Input />
      </Form.Item>
    </>
  )
})