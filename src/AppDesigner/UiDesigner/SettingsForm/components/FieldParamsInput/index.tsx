import { observer } from "@formily/reactive-react";
import { Button, Modal } from "antd";
import React, { useCallback, useState } from "react";
import { TextWidget } from '@designable/react'
import { MonacoInput } from '@designable/react-settings-form'

export const FieldParamsInput = observer(() => {
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
      <Button block onClick={showModal}>
        <TextWidget token="SettingComponents.FieldParamsInput.ConfigParams" />
      </Button>
      <Modal
        title={<TextWidget token="SettingComponents.FieldParamsInput.ConfigParams" />}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<TextWidget token="SettingComponents.FieldParamsInput.Confirm" />}
        cancelText={<TextWidget token="SettingComponents.FieldParamsInput.Cancel" />}
      >
        <div
          style={{
            flex: 1,
            //marginRight: "8px",
            minHeight: 300,
            height: "calc(100vh - 400px)"
          }}
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
            language="json"
          />
        </div>
      </Modal>
    </>
  )
})