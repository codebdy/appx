import { Collapse, Empty, Form, Input } from "antd"
import React, { useCallback, useEffect } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useElementView } from "./elements"
import "./style.less"

const { Panel } = Collapse;

export const PropertyPanel = memo((props: {
  element?: any,
  modeler?: any,
}) => {
  const { element, modeler } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const elementView = useElementView(element, modeler);
  useEffect(() => {
    form.setFieldValue("id", element?.businessObject?.id || '')
    form.setFieldValue("name", element?.businessObject?.name || '')
    form.setFieldValue("documentation", element?.businessObject?.documentation || '')
  }, [element?.businessObject])

  const handleValueChange = useCallback((changedValue) => {
    const modeling = modeler.get('modeling');
    if (changedValue?.name) {
      //modeling.updateLabel(element, changedValue.name);
      modeling.updateProperties(element, { name: changedValue?.name })
    } else if (changedValue?.documentation) {
      modeling.updateProperties(element, { documentation: changedValue?.documentation })
    } else if (changedValue?.id) {
      modeling.updateProperties(element, { id: changedValue?.id })
    }
  }, [modeler, element])

  return (
    <div className="property-pannel-form" key={element?.id}>
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
        {
          elementView ?
            <>
              <div className="element-summary">
                <div className="element-icon">
                  {elementView.icon}
                </div>
                <div className="element-text">
                  <div className="element-type">
                    {elementView.type}
                  </div>
                  {
                    elementView?.name !== false &&
                    <div className="element-name">
                      {elementView.name}
                    </div>
                  }
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
            </>
            : <Empty />
        }

      </Form>
    </div>
  )
})