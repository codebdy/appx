import { FormInstance, Col, Form, Row, Tabs, Select } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { IPageInput, IProcess, IProcessCategory } from "~/model";
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
const { Option } = Select;

const ProcessForm = memo((props: {
  categoryUuid?: string,
  process?: IProcess,
  categories: IProcessCategory[],
  form: FormInstance<IPageInput>
}) => {
  const { categoryUuid, process, categories, form } = props;
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
      initialValues={{ name: process?.name || "", categoryUuid: process?.categoryUuid || categoryUuid || "" }}
      autoComplete="off"
      onKeyUp={handleKeyUp}
    >
      <Row gutter={12}>
        <Col span={12}> 
          <Form.Item
            label={t("Name")}
            name="name"
            rules={[{ required: true, message: t("Required") }]}
          >
            <MultiLangInput title={t("Name")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t("AppBpmn.SelectCategory")}
            name="categoryUuid"
          >
            <Select>
              <Option value=""><em>None</em></Option>
              {
                categories.map((category) => {
                  return (
                    <Option key={category.uuid} value={category.uuid}>
                      {p(category.name)}
                    </Option>
                  )
                })
              }
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
})

export default ProcessForm;