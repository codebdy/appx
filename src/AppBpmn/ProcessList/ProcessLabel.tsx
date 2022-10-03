import React, { useCallback, useState } from "react";
import { memo } from "react";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { ProcessAction } from "./ProcessAction";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { useParseLangMessage } from "../../plugin-sdk";
import { IProcess } from "../../model/process";

export const ProcessLabel = memo((
  props: {
    process: IProcess
  }
) => {
  const { process } = props;
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const p = useParseLangMessage();
  const appUuid = useEdittingAppUuid();
  //const backup = useBackupSnapshot(appUuid);
  //const setDiagrams = useSetRecoilState(diagramsState(appUuid));
  //const getPagcage = useGetPackage(appUuid)


  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleChange = useCallback((value?: string) => {
    handleEditFinish(value);
  }, []);

  const handleEditFinish = useCallback((value?: string) => {
    //backup()
    setEditing(false);
    //setDiagrams(diagrams => diagrams.map(dm => dm.uuid === diagram.uuid ? { ...diagram, name: value || name } : dm))
  }, [])

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleEditFinish();
    }
  };

  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        !editing ?
          <ProcessAction process={process}
            onEdit={handleEdit}
            onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      <div>{p(process?.name)}</div>
    </TreeNodeLabel>
  )
})
