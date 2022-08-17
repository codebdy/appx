import { Button, Form, Modal, Select, Space } from "antd";
import React, { memo, useCallback, useState } from "react";
import { MonacoInput } from '@designable/react-settings-form'
import "./style.less"
import { useGetPackageEntities, usePackages } from "../../../datasource/hooks";
import { IDataSource } from "../../../datasource";
import { PlayCircleOutlined } from "@ant-design/icons";
import { TextWidget } from '@designable/react'

const { OptGroup, Option } = Select;

const DataSourceInput = memo((
  props: {
    onChange: (dataSource: IDataSource) => void
  }
) => {
  const { onChange } = props;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const packages = usePackages();
  const getPackageEntities = useGetPackageEntities();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    form.validateFields().then((formValues) => {
      console.log(formValues)
      //setIsModalVisible(false);
    })

  }, [form]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setIsModalVisible(false);
  }, [form]);

  return (
    <>
      <Button
        block
        onClick={showModal}
      >
        <TextWidget token="SettingComponents.DataSourceInput.Title" />
      </Button>
      <Modal
        title={<TextWidget token="SettingComponents.DataSourceInput.Title" />}
        className="config-datasource-modal"
        width={900}
        visible={isModalVisible}
        footer={
          <div className="footer-toolbar">
            <Button icon={<PlayCircleOutlined />}>
              <TextWidget token="SettingComponents.DataSourceInput.Test" />
            </Button>
            <Space>
              <Button onClick={handleCancel}>
                <TextWidget token="SettingComponents.DataSourceInput.Cancel" />
              </Button>
              <Button type="primary" onClick={handleOk}>
                <TextWidget token="SettingComponents.DataSourceInput.Confirm" />
              </Button>
            </Space>
          </div>
        }
      >
        <Form
          layout={"vertical"}
          form={form}
          initialValues={{}}
        >
          <Form.Item
            label={<TextWidget token="SettingComponents.DataSourceInput.Entity" />}
            name="entityUuid"
            rules={[{ required: true, message: <TextWidget token="SettingComponents.DataSourceInput.Required" /> }]}
          >
            <Select
            //onChange={handleChange}
            >
              {
                packages?.map(pkg => {
                  return (
                    <OptGroup key={pkg.uuid} label={pkg.name}>
                      {
                        getPackageEntities(pkg.uuid)?.map(entity => {
                          return (
                            <Option key={entity.uuid} value={entity.uuid}>{entity.name}</Option>
                          )
                        })
                      }
                    </OptGroup>
                  )
                })
              }
            </Select>
          </Form.Item>
          <div style={{ display: "flex", width: "100%" }}>
            <div className="gql-expression-shell">
              <Form.Item
                label={<TextWidget token="SettingComponents.DataSourceInput.GraphqlExpression" />}
                name="expression"
              >
                <MonacoInput
                  className="gql-input-area"
                  //{...props}
                  options={{
                    readOnly: false,
                    //glyphMargin: false,
                    //folding: false,
                    //lineNumbers: "off",
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 0,
                    minimap: {
                      enabled: false,
                    }
                  }}
                  //value={transformToMarkupSchemaCode(props.tree)}
                  language="graphql"
                />
              </Form.Item>
            </div>
            <div className="gql-variables-shell">
              <Form.Item
                label={<TextWidget token="SettingComponents.DataSourceInput.Variables" />}
                name = "variables"
              >
                <MonacoInput
                  className="gql-input-area"
                  //{...props}
                  options={{
                    readOnly: false,
                    glyphMargin: false,
                    folding: false,
                    lineNumbers: "off",
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 0,
                    minimap: {
                      enabled: false,
                    }
                  }}
                  //value={transformToMarkupSchemaCode(props.tree)}
                  language="json"
                />
              </Form.Item>
            </div>
          </div>

        </Form>
      </Modal>
    </>
  )
})

export default DataSourceInput;