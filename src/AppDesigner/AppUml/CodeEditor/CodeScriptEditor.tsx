import React, { memo, useCallback } from "react"
import { useSetRecoilState } from "recoil";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { useSelectedCode } from "../hooks/useSelectedCode";
import { codesState } from "../recoil/atoms";
import { CodeInput } from "./CodeInput";

export const CodeScriptEditor = memo(() => {
  const appId = useEdittingAppId();
  const code = useSelectedCode(appId);
  const setCodes = useSetRecoilState(codesState(appId))
  const backup = useBackupSnapshot(appId);
  const handleChange = useCallback((value: string) => {
    backup();
    setCodes(codes => codes.map(cd => cd.uuid === code.uuid ? { ...cd, code: value } : cd))
  }, [backup, setCodes, code])
  return (
    <CodeInput value={code.code} onChange={handleChange} />
  )
})