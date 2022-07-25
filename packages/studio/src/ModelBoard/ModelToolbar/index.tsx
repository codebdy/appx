import React, { memo, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  changedState,
  diagramsState,
  classesState,
  metaState,
  minMapState,
  redoListState,
  relationsState,
  selectedDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";
import { useUndo } from "../hooks/useUndo";
import { useRedo } from "../hooks/useRedo";
import { useAttribute } from "../hooks/useAttribute";
import { useDeleteSelectedElement } from "../hooks/useDeleteSelectedElement";
import { CONST_ID, EntityNameMeta, Meta, MetaStatus } from "../meta/Meta";
import SyncButton from "./SyncButton";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { useValidate } from "../hooks/useValidate";
import { useShowError } from "../../hooks/useShowError";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { Button } from "antd";
import SvgIcon from "../../common/SvgIcon";
import { DeleteOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons";

export const ModelToolbar = memo(() => {
  const appId = useSelectedAppId();
  const [meta, setMeta] = useRecoilState(metaState(appId));
  const classeMetas = useRecoilValue(classesState(appId));
  const relations = useRecoilValue(relationsState(appId));
  const diagrams = useRecoilValue(diagramsState(appId));
  const x6Nodes = useRecoilValue(x6NodesState(appId));
  const x6Edges = useRecoilValue(x6EdgesState(appId));
  const [changed, setChanged] = useRecoilState(changedState(appId));
  const undoList = useRecoilValue(undoListState(appId));
  const redoList = useRecoilValue(redoListState(appId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(appId));
  const selectedElement = useRecoilValue(selectedElementState(appId));
  const { attribute } = useAttribute(selectedElement || "", appId);
  const undo = useUndo(appId);
  const redo = useRedo(appId);
  const deleteSelectedElement = useDeleteSelectedElement(appId);
  const [minMap, setMinMap] = useRecoilState(minMapState(appId));
  const validate = useValidate(appId);
  // const [excuteSave, { loading, error }] = usePostOne<Meta>(EntityNameMeta, {
  //   onCompleted(data: Meta) {
  //     setSuccessAlertState(true);
  //     setChanged(false);
  //     setMeta(data);
  //   },
  // });

  // useShowError(error);

  const toggleMinMap = useCallback(() => {
    setMinMap((a) => !a);
  }, [setMinMap]);

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = () => {
    redo();
  };

  const handleDelete = useCallback(() => {
    deleteSelectedElement();
  }, [deleteSelectedElement]);

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
    <div className={"model-toolbar"}>
      <div className={"toolbarInner"}>
        <Button
          disabled={undoList.length === 0}
          shape="circle"
          onClick={handleUndo}
          size="large"
        >
          <UndoOutlined />
        </Button>
        <Button
          className={"Button"}
          disabled={redoList.length === 0}
          shape="circle"
          onClick={handleRedo}
          size="large"
        >
          <RedoOutlined />
        </Button>
        <Button
          className={"Button"}
          disabled={
            (attribute && attribute.name === CONST_ID) || !selectedElement
          }
          shape="circle"
          onClick={handleDelete}
          size="large"
        >
          <DeleteOutlined />
        </Button>
        <div style={{ flex: 1 }} />
        <Button
          color={minMap ? "primary" : "default"}
          shape="circle"
          disabled={!selectedDiagram}
          onClick={toggleMinMap}
        >
          <SvgIcon>
            <path
              fill="currentColor"
              d="M12 4C14.2 4 16 5.8 16 8C16 10.1 13.9 13.5 12 15.9C10.1 13.4 8 10.1 8 8C8 5.8 9.8 4 12 4M12 2C8.7 2 6 4.7 6 8C6 12.5 12 19 12 19S18 12.4 18 8C18 4.7 15.3 2 12 2M12 6C10.9 6 10 6.9 10 8S10.9 10 12 10 14 9.1 14 8 13.1 6 12 6M20 19C20 21.2 16.4 23 12 23S4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21S18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19Z"
            />
          </SvgIcon>
        </Button>
        <div className={"saveButtonShell"}>
          <Button
            color="primary"
            disabled={!changed}
            loading={false}
            onClick={handleSave}
          >
            {getLocalMessage("save")}
          </Button>
          <SyncButton />
        </div>
      </div>
    </div>
  );
});
