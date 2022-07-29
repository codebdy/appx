import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ID } from "../../shared";
import { EVENT_UNDO_REDO, triggerCanvasEvent } from "../GraphCanvas/events";
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
  packagesState,
} from "../recoil/atoms";

export function useUndo(appUuid: ID) {
  const [undoList, setUndoList] = useRecoilState(undoListState(appUuid));
  const setRedoList = useSetRecoilState(redoListState(appUuid));
  const [packages, setPackages] = useRecoilState(packagesState(appUuid))
  const [diagrams, setDiagrams] = useRecoilState(diagramsState(appUuid));
  const [entities, setEntities] = useRecoilState(classesState(appUuid));
  const [relations, setRelations] = useRecoilState(relationsState(appUuid));
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState(appUuid));
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState(appUuid));
  const setChanged = useSetRecoilState(changedState(appUuid));

  const [selectedDiagram, setSelectedDiagram] =
    useRecoilState(selectedDiagramState(appUuid));
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState(appUuid));

  const undo = useCallback(() => {
    const snapshot = undoList[undoList.length - 1];
    setChanged(true);
    setRedoList((snapshots) => [
      ...snapshots,
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
    setUndoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setPackages(snapshot.packages);
    setDiagrams(snapshot.diagrams);
    setEntities(snapshot.classes);
    setRelations(snapshot.relations);
    setX6Nodes(snapshot.x6Nodes);
    setX6Edges(snapshot.x6Edges);
    setSelectedDiagram(snapshot.selectedDiagram);
    setSelectedElement(snapshot.selectedElement);
    triggerCanvasEvent({
      name: EVENT_UNDO_REDO,
    });
  }, [
    packages,
    diagrams,
    entities,
    relations,
    selectedDiagram,
    selectedElement,
    setChanged,
    setDiagrams,
    setEntities,
    setRedoList,
    setRelations,
    setSelectedDiagram,
    setSelectedElement,
    setUndoList,
    setX6Edges,
    setX6Nodes,
    undoList,
    x6Edges,
    x6Nodes,
  ]);
  return undo;
}
