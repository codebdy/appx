import { Form, Input, Select } from "antd"
import { MultiLangInput } from "../../../../../components/pc"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { PageSelect } from "../../PageSelect"
import { IOpenPageAction, OpenPageType } from "../../../../../shared/action/model"
const { Option } = Select;

export const OpenPagePanel = memo((
  props: {
    payload: IOpenPageAction
  }
) => {
  const { payload: openPageAction } = props;
  const { t } = useTranslation();

  return (
    openPageAction &&
    <>
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
      {
        (openPageAction.openType === OpenPageType.Dialog || openPageAction.openType === OpenPageType.Drawer) &&
        <Form.Item
          label={t("Action.PageTitle")}
          name="pageTitle"
        >
          <MultiLangInput title={t("Title")} />
        </Form.Item>
      }

      {
        (openPageAction.openType === OpenPageType.Drawer) &&
        <Form.Item
          label={t("Action.Placement")}
          name="placement"
        >
          <Select>
            <Option value={"right"}>{t("Action.Right")}</Option>
            <Option value={"bottom"}>{t("Action.Bottom")}</Option>
            <Option value={"left"}>
              {t("Action.Left")}
            </Option>
            <Option value={"top"}>
              {t("Action.Top")}
            </Option>
          </Select>
        </Form.Item>
      }

      {
        ((openPageAction.openType === OpenPageType.Drawer && openPageAction.placement !== "top" && openPageAction.placement !== "bottom") ||
          openPageAction.openType === OpenPageType.Dialog
        ) &&
        <Form.Item
          label={t("Width")}
          name="width"
        >
          <Input />
        </Form.Item>
      }

      {
        ((openPageAction.openType === OpenPageType.Drawer && (openPageAction.placement === "top" || openPageAction.placement === "bottom")) ||
          openPageAction.openType === OpenPageType.Dialog
        ) &&
        <Form.Item
          label={t("Height")}
          name="height"
        >
          <Input />
        </Form.Item>
      }

    </>
  )
})