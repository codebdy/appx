import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ID } from "../../shared";
import {
  changedState,
  diagramsState,
  classesState,
  redoListState,
  relationsState,
  selectedUmlDiagramState,
  selectedElementState,
  undoListState,
  x6EdgesState,
  x6NodesState,
  packagesState,
} from "../recoil/atoms";

export function useBackupSnapshot(appUuid: ID) {
  const diagrams = useRecoilValue(diagramsState(appUuid));
  const entities = useRecoilValue(classesState(appUuid));
  const relations = useRecoilValue(relationsState(appUuid));
  const packages = useRecoilValue(packagesState(appUuid))
  const x6Nodes = useRecoilValue(x6NodesState(appUuid));
  const x6Edges = useRecoilValue(x6EdgesState(appUuid));
  const selectedDiagram = useRecoilValue(selectedUmlDiagramState(appUuid));
  const selectedElement = useRecoilValue(selectedElementState(appUuid));
  const setChanged = useSetRecoilState(changedState(appUuid));

  const setUndoList = useSetRecoilState(undoListState(appUuid));
  const setRedoList = useSetRecoilState(redoListState(appUuid));

  const backupSnapshot = useCallback(() => {
    setChanged(true);
    setUndoList((undoList) => [
      ...undoList,
      {
        packages,
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
    packages,
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
