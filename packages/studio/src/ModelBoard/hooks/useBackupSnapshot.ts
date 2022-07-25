import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ID } from "../../shared";
import {
  changedState,
  diagramsState,
  classesState,
  redoListState,
  relationsState,
  selectedDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
} from "../recoil/atoms";

export function useBackupSnapshot(appId: ID) {
  const diagrams = useRecoilValue(diagramsState(appId));
  const entities = useRecoilValue(classesState(appId));
  const relations = useRecoilValue(relationsState(appId));
  const x6Nodes = useRecoilValue(x6NodesState(appId));
  const x6Edges = useRecoilValue(x6EdgesState(appId));
  const selectedDiagram = useRecoilValue(selectedDiagramState(appId));
  const selectedElement = useRecoilValue(selectedElementState(appId));
  const setChanged = useSetRecoilState(changedState(appId));

  const setUndoList = useSetRecoilState(undoListState(appId));
  const setRedoList = useSetRecoilState(redoListState(appId));

  const backupSnapshot = useCallback(() => {
    setChanged(true);
    setUndoList((undoList) => [
      ...undoList,
      {
        diagrams,
        classes: entities,
        relations,
        x6Nodes,
        x6Edges,
        selectedDiagram,
        selectedElement,
      },
    ]);
    setRedoList([]);
  }, [
    diagrams,
    entities,
    relations,
    selectedDiagram,
    selectedElement,
    setChanged,
    setRedoList,
    setUndoList,
    x6Edges,
    x6Nodes,
  ]);

  return backupSnapshot;
}
