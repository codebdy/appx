import { Form, Input } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const NavigatePanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Action.RouteTo")}
        name="route"
      >
        <Input title={t("Action.RouteTo")} />
      </Form.Item>
    </>
  )
})