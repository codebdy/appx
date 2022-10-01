import { Button, Modal } from "antd"
import React, { useCallback, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { MonacoInput } from '@designable/react-settings-form'
import MonacoEditor from "react-monaco-editor";

export const ScriptInput = memo(() => {
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

  const handleEditorDidMount = (monaco: any)=>{
    // monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
    //   validate: true,
    // });
  }

  const handleChange = (valueStr: string)=>{

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
        <div
          style={{
            flex: 1,
            minHeight: 300,
            height: "calc(100vh - 400px)"
          }}
        >
          <MonacoEditor
            language="javascript"
            theme={ 'vs-dark'}
            value={""}
            editorDidMount={handleEditorDidMount}
            onChange={handleChange}
          />
        </div>
      </Modal>
    </>
  )
})