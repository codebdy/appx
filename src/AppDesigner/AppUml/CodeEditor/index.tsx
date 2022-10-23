import React, { memo, useCallback } from "react"
import MonacoEditor from "react-monaco-editor"
import { useSetRecoilState } from "recoil";
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useSelectedCode } from "../hooks/useSelectedCode";
import { codesState } from "../recoil/atoms";

export const CodeEditor = memo(() => {
  const appId = useEdittingAppId();
  const code = useSelectedCode(appId);
  const setCodes = useSetRecoilState(codesState(appId))
  const backup = useBackupSnapshot(appId);
  const handleChange = useCallback((value: string) => {
    backup();
    setCodes(codes => codes.map(cd => cd.uuid === code.uuid ? { ...cd, code: value } : cd))
  }, [backup, setCodes, code])
  return (
    <div style={{ height: "100%" }}>
      <MonacoEditor
        language="javascript"
        options={{
          selectOnLineNumbers: true
        }}
        theme={'vs-dark'}
        value={code?.code}
        //editorDidMount={handleEditorDidMount}
        onChange={handleChange}
      />
    </div>
  )
})