import { Collapse, Form, Input } from "antd"
import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

const { Panel } = Collapse;

export const TaskPanel = memo((props: {
  element?: any,
  modeler?: any,
}) => {
  const { element, modeler } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("id", element?.businessObject?.id || '')
    form.setFieldValue("name", element?.businessObject?.name || '')
  }, [element?.businessObject])
  console.log("安徽", element?.businessObject)

  const handleValueChange = useCallback((changedValue) => {
    if (changedValue?.name) {
      const modeling = modeler.get('modeling');
      modeling.updateLabel(element, changedValue.name);
    }
  }, [])

  return (
    <div className="property-pannel-form">
      <Form
        name="taskform"
        labelCol={{ span: 8 }}
        labelAlign="left"
        layout="vertical"
        wrapperCol={{ span: 24 }}
        form={form}
        autoComplete="off"
        size="small"
        onValuesChange={handleValueChange}
      >
        <Collapse defaultActiveKey={['general']} expandIconPosition="end">
          <Panel header={t("Model.General")} key="general">
            <Form.Item
              label="ID"
              name="id"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("Name")}
              name="name"
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Panel>
          <Panel header={t("Model.Documentation")} key="document">
            <Form.Item
              label={t("Model.ElementDocumentation")}
              name="documentation"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Panel>
        </Collapse>

      </Form>
    </div>
  )
})