import { Form, FormInstance } from "antd";
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view";
import React, { useCallback } from "react";
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
  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Form
      name="eidtCategory"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
      initialValues={{ title: title }}
      onKeyUp={handleKeyUp}
    >
      <Form.Item
        label={t("Pages.CagegoryName")}
        name="title"
        rules={[{ required: true, message: t("Required") }]}
      >
        <MultiLangInput title={t("Pages.CagegoryName")} />
      </Form.Item>
    </Form>
  )
})

export default CategoryForm;