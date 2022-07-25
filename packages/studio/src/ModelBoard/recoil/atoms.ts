import { atomFamily } from "recoil";
import { DiagramMeta } from "../meta/DiagramMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { Meta } from "../meta/Meta";
import { RelationMeta, RelationType } from "../meta/RelationMeta";
import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { X6NodeMeta } from "../meta/X6NodeMeta";
import { LineAction } from "./LineAction";
import { ID } from "../../shared";

export interface Snapshot {
  diagrams: DiagramMeta[];
  classes: ClassMeta[];
  relations: RelationMeta[];
  x6Nodes: X6NodeMeta[];
  x6Edges: X6EdgeMeta[];
  selectedElement?: string;
  selectedDiagram?: string;
}

export const minMapState = atomFamily<boolean, ID>({
  key: "local.minMap",
  default: true,
});

export const publishedIdState = atomFamily<ID | undefined, ID>({
  key: "local.publishedId",
  default: undefined,
});

export const changedState = atomFamily<boolean, ID>({
  key: "local.changed",
  default: false,
});

export const diagramsState = atomFamily<DiagramMeta[], ID>({
  key: "local.diagrams",
  default: [],
});

export const metaState = atomFamily<Meta | undefined, ID>({
  key: "local.meta",
  default: undefined,
});

export const classesState = atomFamily<ClassMeta[], ID>({
  key: "local.classes",
  default: [],
});

export const relationsState = atomFamily<RelationMeta[], ID>({
  key: "local.relations",
  default: [],
});

export const x6NodesState = atomFamily<X6NodeMeta[], ID>({
  key: "local.x6Nodes",
  default: [],
});

export const x6EdgesState = atomFamily<X6EdgeMeta[], ID>({
  key: "local.x6Edges",
  default: [],
});

export const undoListState = atomFamily<Snapshot[], ID>({
  key: "local.undoList",
  default: [],
});

export const redoListState = atomFamily<Snapshot[], ID>({
  key: "local.redoList",
  default: [],
});

export const selectedElementState = atomFamily<string | undefined, ID>({
  key: "local.selectedElement",
  default: undefined,
});

export const selectedDiagramState = atomFamily<string | undefined, ID>({
  key: "local.selectedDiagram",
  default: undefined,
});

export const drawingLineState = atomFamily<LineAction | undefined, ID>({
  key: "local.drawingLine",
  default: undefined,
});

export const pressedLineTypeState = atomFamily<
  RelationType | undefined,
  number
>({
  key: "local.pressedLineType",
  default: undefined,
});

export const prepareLinkToNodeState = atomFamily<string | undefined, number>({
  key: "local.prepareLinkToNode",
  default: undefined,
});
