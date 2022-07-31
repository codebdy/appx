import { atomFamily } from "recoil";
import { DiagramMeta } from "../meta/DiagramMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { Meta } from "../meta/Meta";
import { RelationMeta, RelationType } from "../meta/RelationMeta";
import { X6EdgeMeta } from "../meta/X6EdgeMeta";
import { X6NodeMeta } from "../meta/X6NodeMeta";
import { LineAction } from "./LineAction";
import { ID } from "../../shared";
import { PackageMeta } from "../meta/PackageMeta";

export interface Snapshot {
  diagrams: DiagramMeta[];
  packages: PackageMeta[];
  classes: ClassMeta[];
  relations: RelationMeta[];
  x6Nodes: X6NodeMeta[];
  x6Edges: X6EdgeMeta[];
  selectedElement?: string;
  selectedDiagram?: string;
}

export const SYSTEM_APP_UUID = "SYSTEM"

export const minMapState = atomFamily<boolean, string>({
  key: "local.minMap",
  default: true,
});

export const publishedIdState = atomFamily<ID | undefined, string>({
  key: "local.publishedId",
  default: undefined,
});

export const changedState = atomFamily<boolean, string>({
  key: "local.changed",
  default: false,
});

export const diagramsState = atomFamily<DiagramMeta[], string>({
  key: "local.diagrams",
  default: [],
});


export const metaState = atomFamily<Meta | undefined, string>({
  key: "local.meta",
  default: undefined,
});

export const packagesState = atomFamily<PackageMeta[], string>({
  key: "local.packages",
  default: [],
})

export const classesState = atomFamily<ClassMeta[], string>({
  key: "local.classes",
  default: [],
});

export const relationsState = atomFamily<RelationMeta[], string>({
  key: "local.relations",
  default: [],
});

export const x6NodesState = atomFamily<X6NodeMeta[], string>({
  key: "local.x6Nodes",
  default: [],
});

export const x6EdgesState = atomFamily<X6EdgeMeta[], string>({
  key: "local.x6Edges",
  default: [],
});

export const undoListState = atomFamily<Snapshot[], string>({
  key: "local.undoList",
  default: [],
});

export const redoListState = atomFamily<Snapshot[], string>({
  key: "local.redoList",
  default: [],
});

export const selectedElementState = atomFamily<string | undefined, string>({
  key: "local.selectedElement",
  default: undefined,
});

export const selectedDiagramState = atomFamily<string | undefined, string>({
  key: "local.selectedDiagram",
  default: undefined,
});

export const drawingLineState = atomFamily<LineAction | undefined, string>({
  key: "local.drawingLine",
  default: undefined,
});

export const pressedLineTypeState = atomFamily<
  RelationType | undefined,
  ID
>({
  key: "local.pressedLineType",
  default: undefined,
});

export const prepareLinkToNodeState = atomFamily<string | undefined, string>({
  key: "local.prepareLinkToNode",
  default: undefined,
});
