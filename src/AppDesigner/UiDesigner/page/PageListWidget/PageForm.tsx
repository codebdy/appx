import { FormInstance, Col, Form, Row, Tabs, Select } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import FormTemplates from "./FormTemplates";
import { IPage, IPageCategory, IPageInput } from "~/model";
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
const { TabPane } = Tabs;
const { Option } = Select;

const PageForm = memo((props: {
  categoryUuid?: string,
  page?: IPage,
  categories: IPageCategory[],
  form: FormInstance<IPageInput>
}) => {
  const { categoryUuid, page, categories, form } = props;
  const { t } = useTranslation();
  const p = useParseLangMessage();

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Form
      name="editPage"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      initialValues={{ title: page?.title || "", categoryUuid: page?.categoryUuid || categoryUuid || "" }}
      autoComplete="off"
      onKeyUp={handleKeyUp}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            label={t("Pages.PageName")}
            name="title"
            rules={[{ required: true, message: t("Required") }]}
          >
            <MultiLangInput title={t("Pages.PageName")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t("Pages.SelectCategory")}
            name="categoryUuid"
          >
            <Select>
              <Option value=""><em>None</em></Option>
              {
                categories.map((category) => {
                  return (
                    <Option key={category.uuid} value={category.uuid}>
                      {p(category.title)}
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