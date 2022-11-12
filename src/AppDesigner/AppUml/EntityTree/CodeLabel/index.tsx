import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import TreeNodeLabel from "~/common/TreeNodeLabel";
import { useParseLangMessage } from "@rxdrag/plugin-sdk";
import CodeAction from "./CodeAction";
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

  useEffect(() => {
    setName(code.name)
  }, [code])

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        !editing ?
          <CodeAction code={code}
            onEdit={handleEdit}
            onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      <div>{p(name)}</div>
    </TreeNodeLabel>
  )
})

export default CodeLabel;