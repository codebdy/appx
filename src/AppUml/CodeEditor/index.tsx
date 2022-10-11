import React, { memo, useCallback } from "react"
import MonacoEditor from "react-monaco-editor"

export const CodeEditor = memo(() => {
  const handleChange = useCallback(()=>{

  }, [])
  return (
    <MonacoEditor
      language="javascript"
      options={{
        selectOnLineNumbers: true
      }}
      theme={'vs-dark'}
      value={"value"}
      //editorDidMount={handleEditorDidMount}
      onChange={handleChange}
    />
  )
})