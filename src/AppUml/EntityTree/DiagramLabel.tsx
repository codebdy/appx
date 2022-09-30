import { Input } from "antd";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { useSetRecoilState } from 'recoil';
import { diagramsState } from './../recoil/atoms';
import { DiagramMeta } from "../meta/DiagramMeta";
import DiagramAction from "./DiagramAction";
import { useGetPackage } from "../hooks/useGetPackage";
import { SYSTEM_APP_UUID } from "../../consts";
import { useEdittingAppUuid } from "../hooks/useAppUuid";


const DiagramLabel = memo((
  props: {
    diagram: DiagramMeta
  }
) => {
  const { diagram } = props;
  const [name, setName] = useState(diagram.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);

  const appUuid = useEdittingAppUuid();
  const backup = useBackupSnapshot(appUuid);
  const setDiagrams = useSetRecoilState(diagramsState(appUuid));
  const getPagcage = useGetPackage(appUuid)

  useEffect(() => {
    setName(diagram.name)
  }, [diagram])


  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleEditFinish = useCallback(() => {
    backup()
    setEditing(false);
    setDiagrams(diagrams => diagrams.map(dm => dm.uuid === diagram.uuid ? { ...diagram, name } : dm))
  }, [backup, name, diagram, setDiagrams])

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleEditFinish();
    }
  };

  return (
    <TreeNodeLabel
      fixedAction={visible || (getPagcage(diagram.packageUuid)?.sharable && appUuid !== SYSTEM_APP_UUID)}
      action={!editing ?
        <DiagramAction diagram={diagram}
          onEdit={handleEdit}
          onVisibleChange={handleVisableChange} /> : undefined}
    >
      {
        editing ?
          <Input
            size="small"
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={handleChange}
            onBlur={handleEditFinish}
            onKeyUp={handleKeyEnter}
          />
          :
          <div>{name}</div>
      }

    </TreeNodeLabel>
  )
})

export default DiagramLabel;