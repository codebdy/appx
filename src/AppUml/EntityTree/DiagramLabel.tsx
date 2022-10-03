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
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { useParseLangMessage } from "../../plugin-sdk";
import { MultiLangInput } from "../../plugins/inputs/components/pc/MultiLangInput/view";

const DiagramLabel = memo((
  props: {
    diagram: DiagramMeta
  }
) => {
  const { diagram } = props;
  const [name, setName] = useState(diagram.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const p = useParseLangMessage();
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

  const handleChange = useCallback((value?: string) => {
    setName(value);
    handleEditFinish(value);
  }, []);

  const handleEditFinish = useCallback((value?: string) => {
    backup()
    setEditing(false);
    setDiagrams(diagrams => diagrams.map(dm => dm.uuid === diagram.uuid ? { ...diagram, name: value || name } : dm))
  }, [backup, name, diagram, setDiagrams])

  const handleKeyEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleEditFinish();
    }
  };

  return (
    <TreeNodeLabel
      fixedAction={visible || (getPagcage(diagram.packageUuid)?.sharable && appUuid !== SYSTEM_APP_UUID)}
      action={
        !editing ?
          <DiagramAction diagram={diagram}
            onEdit={handleEdit}
            onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      {
        editing ?
          <MultiLangInput
            inline
            value={name}
            onClick={e => e.stopPropagation()}
            onChange={handleChange}
            onKeyUp={handleKeyEnter}
          />
          :
          <div>{p(name)}</div>
      }

    </TreeNodeLabel>
  )
})

export default DiagramLabel;