import { Form } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view"

export const SuccessMessagePanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Message")}
        name="message"
      >
        <MultiLangInput title={t("Message")} multiline />
      </Form.Item>
    </>
  )
})