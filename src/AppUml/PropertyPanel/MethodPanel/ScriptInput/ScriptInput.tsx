import { Button, Modal } from "antd"
import React, { useCallback, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import MonacoEditor from "react-monaco-editor";
import "./style.less";

export const ScriptInput = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const showModal = useCallback(() => {
    setOpen(true)
  }, [])

  const handleOk = useCallback(() => {
    setOpen(false);
  }, [])

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [])

  const handleEditorDidMount = (monaco: any) => {
    // monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
    //   validate: true,
    // });
  }

  const handleChange = (valueStr: string) => {
    onChange && onChange(valueStr)
  }
  return (
    <>
      <Button block onClick={showModal}>
        {t("AppUml.ConfigScript")}
      </Button>
      <Modal
        className="script-input-modal"
        title={t("AppUml.ConfigScript")}
        width={800}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <div className="input-modal-body">
          <MonacoEditor
            language="javascript"
            options={{
              selectOnLineNumbers: true
            }}
            theme={'vs-dark'}
            value={value}
            editorDidMount={handleEditorDidMount}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  )
})