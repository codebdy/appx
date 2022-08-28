import { Form } from "antd"
import { MultiLangInput } from "../../../../../components/pc"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const ConfirmPanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Title")}
        name="boxTitle"
      >
        <MultiLangInput title={t("Title")} />
      </Form.Item>
      <Form.Item
        label={t("Message")}
        name="message"
      >
        <MultiLangInput title={t("Message")} multiline />
      </Form.Item>
    </>
  )
})