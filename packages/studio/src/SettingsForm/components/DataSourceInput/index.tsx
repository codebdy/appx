import { Button, Form, Input, Modal } from "antd";
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { MonacoInput } from '@designable/react-settings-form'
import "./style.less"

const DataSourceInput = memo((
  props: {

  }
) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

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
          initialValues={{}}
        >
          <Form.Item label="实体">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="表达式">
            <div style={{
              height: "200px"
            }}>
              <MonacoInput
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