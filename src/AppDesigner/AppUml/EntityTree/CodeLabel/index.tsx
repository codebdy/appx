import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useBackupSnapshot } from "../../hooks/useBackupSnapshot";
import TreeNodeLabel from "~/common/TreeNodeLabel";
import { useSetRecoilState } from 'recoil';
import { codesState, diagramsState } from '../../recoil/atoms';
import { useGetPackage } from "../../hooks/useGetPackage";
import { SYSTEM_APP_ID } from "~/consts";
import { useEdittingAppId } from "~/hooks/useEdittingAppUuid";
import { useParseLangMessage } from "@rxdrag/plugin-sdk";
import CodeAction from "./CodeAction";
import { CodeDialog } from "./CodeDialog";
import { CodeMeta } from "../../meta/CodeMeta";

const CodeLabel = memo((
  props: {
    code: CodeMeta
  }
) => {
  const { code } = props;
  const [name, setName] = useState(code.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const p = useParseLangMessage();
  const appUuid = useEdittingAppId();
  const backup = useBackupSnapshot(appUuid);
  const setCodes = useSetRecoilState(codesState(appUuid));
  const getPagcage = useGetPackage(appUuid)

  useEffect(() => {
    setName(code.name)
  }, [code])

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleConfirm = useCallback((code?: CodeMeta) => {
    backup()
    setEditing(false);
    setCodes(codes => codes.map(dm => dm.uuid === code.uuid ? code : dm))
  }, [backup, setCodes]);

  const handleClose = useCallback(() => {
    setEditing(false);
  }, [])

  return (
    <TreeNodeLabel
      fixedAction={visible || (getPagcage(code.packageUuid)?.sharable && appUuid !== SYSTEM_APP_ID)}
      action={
        !editing ?
          <CodeAction code={code}
            onEdit={handleEdit}
            onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      <div>{p(name)}</div>
      {
        editing &&
        <CodeDialog
          open={editing}
          code={code}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      }
    </TreeNodeLabel>
  )
})

export default CodeLabel;