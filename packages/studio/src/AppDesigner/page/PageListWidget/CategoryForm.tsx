import { Form, FormInstance } from "antd";
import MultiLangInput from "../../../shared/MultiLangInput";
import React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const CategoryForm = memo((
  props: {
    title?: string,
    form: FormInstance<any>
  }
) => {
  const { title, form } = props;
  const { t } = useTranslation();
  
  return (
    <Form
      name="eidtCategory"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
      initialValues={{ title: title }}
    >
      <Form.Item
        label={t("Pages.CagegoryName")}
        name="title"
        rules={[{ required: true, message: t("Required") }]}
      >
        <MultiLangInput />
      </Form.Item>
    </Form>
  )
})

export default CategoryForm;