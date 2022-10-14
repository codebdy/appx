import { Modal } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import MonacoEditor from "react-monaco-editor";

export const ExpressionModal = memo((
  props: {
    value?: string,
    open?: boolean,
    saving?: boolean,
    onOpenChange?: (open?: boolean) => void,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, open, saving, onOpenChange, onChange } = props;
  const [expression, setExpression] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    setExpression(value);
  }, [value])

  const handleEditorDidMount = (monaco: any) => {
    monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
    });
  }

  const handleOk = useCallback(() => {
    //onOpenChange && onOpenChange(false);
    onChange && onChange(expression);
  }, [onChange, onOpenChange])

  const handleCancel = useCallback(() => {
    onOpenChange && onOpenChange(false);
    setExpression(value);
  }, [value, onOpenChange])

  const handleChange = useCallback((valueStr: string) => {
    setExpression(valueStr)
  }, [])

  return (
    <Modal
      className="expression-input-modal"
      title={t("Auth.EditExpression")}
      width={800}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      okButtonProps={{
        loading: saving
      }}
    >
      <div className="input-modal-body">
        <MonacoEditor
          language="javascript"
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
  )
})