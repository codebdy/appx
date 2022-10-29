import { Button, Form, Modal, Select, Space } from "antd";
import React, { memo, useCallback, useEffect, useState } from "react";
import { MonacoInput } from '@designable/react-settings-form'
import "./style.less"
import { useGetPackageRootEntities, usePackages } from "~/datasource/hooks";
import { IDataBindSource } from "~/datasource";
import { PlayCircleOutlined } from "@ant-design/icons";
import { TextWidget } from '@designable/react'
import { useGetEntity } from "~/datasource/hooks/useGetEntity";
import { objToString, stringToObj } from "~/shared";
import { useParseLangMessage } from "@rxdrag/plugin-sdk";

const { OptGroup, Option } = Select;
var pluralize = require('pluralize')

function lowcaseFirst(str: string) {
  var strTemp = ""; //新字符串
  for (var i = 0; i < str.length; i++) {
    if (i == 0) {
      strTemp += str[i].toLowerCase(); //第一个
      continue;
    }
    strTemp += str[i];
  }
  return strTemp;
}

const singleTemplateStr =
  `query{
  one#name#(
    where:{
      id:{
        _eq:"{{$params.dataId}}"
      }
    }
  ) {
    id
  }
}`
const multipleTemplateStr =
  `query{
  #name#{
    nodes{
      id
    }
    total
  }
}`

export const DataSourceInput = memo((
  props: {
    isSingle?: boolean,
    value?: IDataBindSource,
    onChange?: (dataSource?: IDataBindSource) => void,
  }
) => {
  const { isSingle, value, onChange } = props;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const packages = usePackages();
  const p = useParseLangMessage();
  const getEntity = useGetEntity();

  const getPackageEntities = useGetPackageRootEntities();
  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
      form.setFieldsValue({ ...value, variables: objToString(value?.variables) })
    }
  }, [form, value, isModalVisible])

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    form.validateFields().then((formValues) => {
      onChange && onChange({
        ...formValues,
        entityName: getEntity(formValues.entityUuid)?.name,
        variables: stringToObj(formValues.variables),
      });
      setIsModalVisible(false);
    })

  }, [form, getEntity, onChange]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleFormChange = useCallback((changedValues) => {
    if (changedValues?.entityUuid) {
      const entityName = getEntity(changedValues?.entityUuid)?.name || ""
      const expression = isSingle
        ? singleTemplateStr.replace("#name#", entityName)
        : multipleTemplateStr.replace("#name#", lowcaseFirst(pluralize(entityName)));
      form.setFieldValue("expression", expression)
    }
  }, [form, getEntity]);

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
        width={600}
        open={isModalVisible}
        onCancel={handleCancel}
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
          onValuesChange={handleFormChange}
        >
          <Form.Item
            label={<TextWidget token="SettingComponents.DataSourceInput.Entity" />}
            name="entityUuid"
            rules={[{ required: true, message: <TextWidget token="SettingComponents.DataSourceInput.Required" /> }]}
          >
            <Select>
              {
                packages?.map(pkg => {
                  return (
                    <OptGroup key={pkg.uuid} label={p(pkg.name)}>
                      {
                        getPackageEntities(pkg.uuid)?.map(entity => {
                          return (
                            <Option key={entity.uuid} value={entity.uuid}>{p(entity.label) || entity.name}</Option>
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
                rules={[{ required: true, message: <TextWidget token="SettingComponents.DataSourceInput.Required" /> }]}
              >
                <MonacoInput
                  className="gql-input-area"
                  options={{
                    readOnly: false,
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
          </div>
        </Form>
      </Modal>
    </>
  )
})
