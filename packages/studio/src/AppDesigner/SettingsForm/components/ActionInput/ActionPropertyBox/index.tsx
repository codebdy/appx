import { ActionType, IAppxAction } from "../../../../../shared/action/model";
import React, { useCallback, useEffect, useMemo } from "react";
import { memo } from "react";
import { Form } from "antd";
import { OpenPagePanel } from "./OpenPagePanel";
import { MultiLangInput } from "../../../../../components/pc";
import { useTranslation } from "react-i18next";
import { useGetPage } from "../../../../../AppDesigner/hooks/useGetPage";

const pannels: { [key: string]: React.FC<{ payload: any }> } = {
  [ActionType.OpenPage]: OpenPagePanel
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
      if(page){
        payload.pageTitle = page.title;
      }
    }
    onChange && onChange({ ...action, title, payload })
  }, [action, getPage, onChange])

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