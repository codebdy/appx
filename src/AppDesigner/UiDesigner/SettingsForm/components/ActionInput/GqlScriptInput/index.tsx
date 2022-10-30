import { observer } from "@formily/reactive-react";
import { Button, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import MonacoEditor from "react-monaco-editor";

export const GqlScriptInput = observer((
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

  const handleEditorDidMount = (monaco: any) => {
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  }
  const handleChange = useCallback((valueStr: string) => {
    setExpression(valueStr)
  }, [])

  return (
    <>
      <Button block onClick={showModal}>
        {t("Action.ScriptConfig")}
      </Button>
      <Modal
        title={t("Action.GQLScript")}
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
          <MonacoEditor
            language="graphql"
            options={{
              selectOnLineNumbers: true
            }}
            theme={'vs-dark'}
            value={expression}
            editorDidMount={handleEditorDidMount}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  )
})