import { observer } from "@formily/reactive-react";
import { Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MonacoInput } from "../../MonacoInput";

export const JavaScriptInput = observer((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props;
  const [expression, setExpression] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    setExpression(value);
  }, [value])


  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
    onChange && onChange(expression)
  }, [expression]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setExpression(value)
  }, [value]);

  const handleChange = useCallback((valueStr: string) => {
    setExpression(valueStr)
  }, [])

  return (
    <>
      <Button block onClick={showModal}>
        {t("Action.ScriptConfig")}
      </Button>
      <Modal
        title={t("Action.JavaScript")}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
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
            language="javascript"
            value={expression}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  )
})