import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useBackupSnapshot } from "../../hooks/useBackupSnapshot";
import TreeNodeLabel from "../../../common/TreeNodeLabel";
import { useSetRecoilState } from 'recoil';
import { diagramsState } from '../../recoil/atoms';
import { DiagramMeta } from "../../meta/DiagramMeta";
import { useGetPackage } from "../../hooks/useGetPackage";
import { SYSTEM_APP_UUID } from "../../../consts";
import { useEdittingAppUuid } from "../../../hooks/useEdittingAppUuid";
import { useParseLangMessage } from "../../../plugin-sdk";
import CodeAction from "./CodeAction";
import { CodeDialog } from "./CodeDialog";
import { CodeMeta } from "src/AppUml/meta/CodeMeta";

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
  const appUuid = useEdittingAppUuid();
  const backup = useBackupSnapshot(appUuid);
  const setDiagrams = useSetRecoilState(diagramsState(appUuid));
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

  const handleConfirm = useCallback((diagram?: DiagramMeta) => {
    backup()
    setEditing(false);
    setDiagrams(diagrams => diagrams.map(dm => dm.uuid === diagram.uuid ? diagram : dm))
  }, [backup, code, setDiagrams]);


  const handleClose = useCallback(() => {
    setEditing(false);
  }, [])

  return (
    <TreeNodeLabel
      fixedAction={visible || (getPagcage(code.packageUuid)?.sharable && appUuid !== SYSTEM_APP_UUID)}
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