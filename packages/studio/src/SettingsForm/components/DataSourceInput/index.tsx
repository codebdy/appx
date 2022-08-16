import { Button, Form, Modal, Select } from "antd";
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MonacoInput } from '@designable/react-settings-form'
import "./style.less"
import { useGetPackageEntities, usePackages } from "../../../datasource/hooks";
import { IDataSource } from "../../../datasource";

const { OptGroup, Option } = Select;

const DataSourceInput = memo((
  props: {
    onChange: (dataSource: IDataSource) => void
  }
) => {
  const { onChange } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const packages = usePackages();
  const getPackageEntities = useGetPackageEntities();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    form.validateFields().then(() => {
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
        {t("SettingsForm.ConfigDataSource")}
      </Button>
      <Modal
        title={t("SettingsForm.ConfigDataSource")}
        className="config-datasource-modal"
        width={800}
        visible={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout={"vertical"}
          form={form}
          initialValues={{}}
        >
          <Form.Item
            label="实体"
            name="entityUuid"
            rules={[{ required: true, message: t("Required") }]}
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
          <Form.Item label="表达式">
            <div style={{
              height: "calc(100vh - 440px)"
            }}>
              <MonacoInput
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
                language="sql"
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default DataSourceInput;