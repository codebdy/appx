import { ActionType, IAppxAction } from "@rxdrag/plugin-sdk/model/action";
import React, { useCallback, useEffect, useMemo } from "react";
import { memo } from "react";
import { Form } from "antd";
import { OpenPagePanel } from "./OpenPagePanel";
import { useTranslation } from "react-i18next";
import { useGetPage } from "../../../../hooks/useGetPage";
import { SuccessMessagePanel } from "./SuccessMessagePanel";
import { ConfirmPanel } from "./ConfirmPanel";
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view";
import { NavigatePanel } from "./NavigatePanel";

const pannels: { [key: string]: React.FC<{ payload: any }> } = {
  [ActionType.OpenPage]: OpenPagePanel,
  [ActionType.SuccessMessage]: SuccessMessagePanel,
  [ActionType.Confirm]: ConfirmPanel,
  [ActionType.Navigate]: NavigatePanel,
}

export const ActionPropertyBox = memo((
  props: {
    action?: IAppxAction,
    onChange?: (action?: IAppxAction) => void,
  }
) => {
  const { action, onChange } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const getPage = useGetPage();

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.uuid])

  useEffect(() => {
    form.setFieldsValue({ title: action.title, ...action.payload })
  }, [action.payload, action.title, action.uuid, form])

  const handleChange = useCallback((changeValues, fromValues) => {
    const { title, ...payload } = fromValues;
    if (changeValues?.pageId) {
      const page = getPage(changeValues?.pageId);
      if (page) {
        payload.pageTitle = page.title;
      }
    }
    onChange && onChange({ ...action, title, payload })
  }, [action, getPage, onChange])

  console.log(action.actionType, pannels)
  const ActionPannel = useMemo(() => pannels[action.actionType], [action.actionType]);

  return (
    <Form
      name="action-property-form"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onValuesChange={handleChange}
    >
      <Form.Item
        label={t("Title")}
        name="title"
      >
        <MultiLangInput title={t("Title")} />
      </Form.Item>
      {
        ActionPannel &&
        <ActionPannel payload={action.payload} />
      }

    </Form>
  )
})