import { Space, Button } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getLocalMessage } from "../../locales/getLocalMessage";
import SyncButton from "./SyncButton";
import { changedState, classesState, diagramsState, metaState, relationsState, x6EdgesState, x6NodesState } from "../recoil/atoms";
import { useSelectedAppUuid } from '../hooks/useSelectedAppUuid';
import { Meta, MetaStatus } from "../meta/Meta";
import { useValidate } from "../hooks/useValidate";


const SavaActions = memo(() => {
  const appUuid = useSelectedAppUuid();
  const [meta, setMeta] = useRecoilState(metaState(appUuid));
  const classeMetas = useRecoilValue(classesState(appUuid));
  const relations = useRecoilValue(relationsState(appUuid));
  const diagrams = useRecoilValue(diagramsState(appUuid));
  const x6Nodes = useRecoilValue(x6NodesState(appUuid));
  const x6Edges = useRecoilValue(x6EdgesState(appUuid));
  const [changed, setChanged] = useRecoilState(changedState(appUuid));
  const validate = useValidate(appUuid);
  
  const handleSave = useCallback(() => {
    if (!validate()) {
      return;
    }
    const content = {
      classes: classeMetas,
      relations,
      diagrams,
      x6Nodes,
      x6Edges,
    };

    const data: Meta =
      meta?.status === MetaStatus.META_STATUS_PUBLISHED || !meta
        ? {
          content,
        }
        : {
          ...meta,
          content,
        };
    // excuteSave(data, service?.url);
  }, [
    classeMetas,
    diagrams,
    meta,
    relations,
    validate,
    x6Edges,
    x6Nodes,
  ]);


  return (
    <Space>
      <Button
        type="primary"
        disabled={!changed}
        loading={false}
        onClick={handleSave}
      >
        {getLocalMessage("save")}
      </Button>
      <SyncButton />
    </Space>
  )
})

export default SavaActions;