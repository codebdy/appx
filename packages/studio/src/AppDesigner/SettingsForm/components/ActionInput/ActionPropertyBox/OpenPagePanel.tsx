import { Form, Select } from "antd"
import { MultiLangInput } from "../../../../../components/pc"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { PageSelect } from "../../PageSelect"
import { OpenPageType } from "../../../../../shared/action/model"
const { Option } = Select;

export const OpenPagePanel = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item
        label={t("Title")}
        name="title"
      >
        <MultiLangInput title={t("Title")} />
      </Form.Item>


      <Form.Item
        label={t("Action.Page")}
        name="pageId"
      >
        <PageSelect />
      </Form.Item>
      <Form.Item
        label={t("Action.OpenType")}
        name="openType"
      >
        <Select>
          <Option value={OpenPageType.RouteTo}>{t("Action." + OpenPageType.RouteTo)}</Option>
          <Option value={OpenPageType.Dialog}>{t("Action." + OpenPageType.Dialog)}</Option>
          <Option value={OpenPageType.Drawer}>
            {t("Action." + OpenPageType.Drawer)}
          </Option>
        </Select>
      </Form.Item>
    </>
  )
})