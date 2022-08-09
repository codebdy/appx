import { FormInstance, Col, Form, Input, Row, Tabs, Select } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import FormTemplates from "./FormTemplates";
import { IPageInput } from "packages/studio/src/model/input";
import { useCagegories } from "../../hooks/useCagegories";
import { IPage } from "../../../model";
import { useTranslation } from "react-i18next";
const { TabPane } = Tabs;
const { Option } = Select;

const PageForm = memo((props: {
  categoryUuid?: string,
  page?: IPage,
  form: FormInstance<IPageInput>
}) => {
  const { page, categoryUuid, form } = props;
  const categories = useCagegories();
  const { t } = useTranslation();

  const handleChange = useCallback((key: string) => {
    console.log(key);
  }, []);

  return (
    <Form
      name="editPage"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      initialValues={{ title: page?.title || "", categoryUuid: categoryUuid || "" }}
      autoComplete="off"
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label={t("Pages.PageName")}
            name="title"
            rules={[{ required: true, message: t("Required") }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t("Pages.SelectCategory")}
            name="categoryUuid"
          >
            <Select onChange={handleChange}>
              <Option value=""><em>None</em></Option>
              {
                categories.map((category) => {
                  return (
                    <Option key={category.uuid} value={category.uuid}>
                      {category.title}
                    </Option>
                  )
                })
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" >
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