import { FormInstance, Col, Form, Row, Tabs, Select } from "antd";
import React from "react";
import { memo } from "react";
import FormTemplates from "./FormTemplates";
import { IPageInput } from "packages/studio/src/model/input";
import { IPage, IPageCategory } from "../../../model";
import { useTranslation } from "react-i18next";
import { ID } from "../../../shared";
import MultiLangInput from "../../../shared/MultiLangInput";
const { TabPane } = Tabs;
const { Option } = Select;

const PageForm = memo((props: {
  categoryId?: ID,
  page?: IPage,
  categories: IPageCategory[],
  form: FormInstance<IPageInput>
}) => {
  const { categoryId, page, categories, form } = props;
  const { t } = useTranslation();

  return (
    <Form
      name="editPage"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      initialValues={{ title: page?.title || "", categoryId: page?.category?.id || categoryId || "" }}
      autoComplete="off"
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label={t("Pages.PageName")}
            name="title"
            rules={[{ required: true, message: t("Required") }]}
          >
            <MultiLangInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t("Pages.SelectCategory")}
            name="categoryId"
          >
            <Select>
              <Option value=""><em>None</em></Option>
              {
                categories.map((category) => {
                  return (
                    <Option key={category.id} value={category.id}>
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