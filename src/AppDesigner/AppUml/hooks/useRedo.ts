import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ID } from "~/shared";
import { EVENT_UNDO_REDO, triggerCanvasEvent } from "../GraphCanvas/events";
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
  codesState,
  selectedCodeState,
} from "../recoil/atoms";

export function useRedo(appId: ID) {
  const setUndoList = useSetRecoilState(undoListState(appId));
  const [redoList, setRedoList] = useRecoilState(redoListState(appId));
  const [packages, setPackages] = useRecoilState(packagesState(appId))
  const [diagrams, setDiagrams] = useRecoilState(diagramsState(appId));
  const [codes, setCodes] = useRecoilState(codesState(appId));
  const [entities, setEntities] = useRecoilState(classesState(appId));
  const [relations, setRelations] = useRecoilState(relationsState(appId));
  const [x6Nodes, setX6Nodes] = useRecoilState(x6NodesState(appId));
  const [x6Edges, setX6Edges] = useRecoilState(x6EdgesState(appId));
  const setChanged = useSetRecoilState(changedState(appId));

  const [selectedDiagram, setSelectedDiagram] = useRecoilState(
    selectedUmlDiagramState(appId)
  );

  const [selectedCode, setSelectedCode] = useRecoilState(
    selectedCodeState(appId)
  );
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(appId)
  );

  const undo = useCallback(() => {
    const snapshot = redoList[redoList.length - 1];
    setChanged(true);
    setUndoList((snapshots) => [
      ...snapshots,
      {
        packages,
        diagrams,
        codes,
        classes: entities,
        relations,
        x6Nodes,
        x6Edges,
        selectedDiagram,
        selectedElement,
        selectedCode,
      },
    ]);
    setRedoList((snapshots) => snapshots.slice(0, snapshots.length - 1));
    setPackages(snapshot.packages);
    setDiagrams(snapshot.diagrams);
    setCodes(snapshot.codes);
    setEntities(snapshot.classes);
    setRelations(snapshot.relations);
    setX6Nodes(snapshot.x6Nodes);
    setX6Edges(snapshot.x6Edges);
    setSelectedDiagram(snapshot.selectedDiagram);
    setSelectedElement(snapshot.selectedElement);
    setSelectedCode(snapshot.selectedCode);
    triggerCanvasEvent({
      name: EVENT_UNDO_REDO,
    });
  }, [
    redoList, 
    setChanged, 
    setUndoList, 
    setRedoList, 
    setPackages, 
    setDiagrams,
    setSelectedCode,
    setCodes, 
    setEntities, 
    setRelations, 
    setX6Nodes, 
    setX6Edges, 
    setSelectedDiagram, 
    setSelectedElement, 
    packages, 
    diagrams, 
    selectedCode,
    codes,
    entities, 
    relations, 
    x6Nodes, 
    x6Edges, 
    selectedDiagram, 
    selectedElement,
  ]);
  return undo;
}
