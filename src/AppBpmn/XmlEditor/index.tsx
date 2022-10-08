import React from "react"
import { memo } from "react"
import MonacoEditor from "react-monaco-editor";

export const XmlEditor = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props;
  const handleEditorDidMount = (monaco: any) => {
    // monaco.languages?.json.jsonDefaults.setDiagnosticsOptions({
    //   validate: true,
    // });
  }


  return (
    <MonacoEditor
      language="xml"
      options={{
        selectOnLineNumbers: true
      }}
      theme={'vs-dark'}
      value={value}
      editorDidMount={handleEditorDidMount}
      onChange={onChange}
    />
  )
})