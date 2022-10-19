import React, { useCallback, useState } from "react";
import { memo } from "react";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { ProcessAction } from "./ProcessAction";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { useParseLangMessage } from "../../plugin-sdk";
import { IProcess } from "../../model/process";
import { UpsertModal } from "./UpsertDialog/UpsertModal";

export const ProcessLabel = memo((
  props: {
    process: IProcess
  }
) => {
  const { process } = props;
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const p = useParseLangMessage();

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleOpenChange = useCallback((open) => {
    setEditing(open)
  }, []);

  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        <ProcessAction process={process}
          onEdit={handleEdit}
          onVisibleChange={handleVisableChange} />
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      <div>{p(process?.name)}</div>
      {
        editing &&
        <UpsertModal process={process} open={editing} onOpenChange={handleOpenChange} />
      }

    </TreeNodeLabel>
  )
})
