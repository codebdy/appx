import { Collapse, Form, Input, List } from "antd"
import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { userTaskIcon } from "../icons"
import "./style.less"

const { Panel } = Collapse;

export const PropertyPanel = memo((props: {
  element?: any,
  modeler?: any,
}) => {
  const { element, modeler } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("id", element?.businessObject?.id || '')
    form.setFieldValue("name", element?.businessObject?.name || '')
    form.setFieldValue("documentation", element?.businessObject?.documentation || '')
  }, [element?.businessObject])
  console.log("Element的 businessObject", element?.businessObject)

  const handleValueChange = useCallback((changedValue) => {
    const modeling = modeler.get('modeling');
    if (changedValue?.name) {
      modeling.updateLabel(element, changedValue.name);
    } else if (changedValue?.documentation) {
      modeling.updateProperties(element, { documentation: changedValue?.documentation })
    } else if (changedValue?.id) {
      modeling.updateProperties(element, { id: changedValue?.id })
    }
  }, [modeler, element])

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
        <div className="element-summary">
          <div className="element-icon">
            {userTaskIcon}
          </div>
          <div className="element-text">
            <div className="element-type">
              用户任务
            </div>
            <div className="element-name">
              发送邮件
            </div>
          </div>
        </div>
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