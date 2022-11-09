import { Form, FormInstance } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import ImageUploader from "~/plugins/inputs/components/pc/ImageUploader/view"
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view"

export const SaveTemplateForm = memo((
  props: {
    form: FormInstance<any>,
  }
) => {
  const { form } = props;
  const { t } = useTranslation()
  return (
    <Form
      name="saveAsTemplate"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label={t("Designer.TemplateName")}
        name="name"
        rules={[{ required: true, message: t("Required") }]}
      >
        <MultiLangInput inline title={t("Designer.TemplateName")} />
      </Form.Item>
      < Form.Item
        label={t("Designer.TemplateImage")}
        name="imageUrl"
      >
        <ImageUploader title={t("Upload")} maxCount={1} />
      </Form.Item>
    </Form>
  )
})