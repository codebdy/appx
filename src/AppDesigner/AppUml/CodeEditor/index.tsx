import React, { memo, useCallback } from "react"
import { useSetRecoilState } from "recoil";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useSelectedCode } from "../hooks/useSelectedCode";
import { codesState } from "../recoil/atoms";
import { MonacoInput } from '@designable/react-settings-form'

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
        value={code?.code}
        onChange={handleChange}
      />
    </div>
  )
})