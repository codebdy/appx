import { FormInstance, Col, Form, Input, Row, Tabs } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback } from "react";
import { memo } from "react";
import FormTemplates from "./FormTemplates";
import { IPageInput } from "packages/studio/src/model/input";
const { TabPane } = Tabs;

const PageForm = memo((props: {
  form: FormInstance<IPageInput>
}) => {
  const {form} = props;
  const onChange = useCallback((key: string) => {
    console.log(key);
  }, []);

  return (
    <Form
      name="editPage"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label={getLocalMessage("pages.PageName")}
            name="name"
            rules={[{ required: true, message: getLocalMessage("Required") }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={getLocalMessage("pages.SelectCategory")}
            name="name"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="表单类" key="1">
          <FormTemplates />
        </TabPane>
        <TabPane tab="门户类" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="流程类" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Form>
  )
})

export default PageForm;