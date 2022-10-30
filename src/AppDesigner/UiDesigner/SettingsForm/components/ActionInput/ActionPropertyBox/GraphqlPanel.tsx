import { Form, Input } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view"
import { GqlScriptInput } from "../GqlScriptInput"

export const GraphqlPanel = memo((
  props: {
  }
) => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Action.GQLScript")}
        name="gqlScript"
      >
        <GqlScriptInput />
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