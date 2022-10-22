import { RelationMeta } from "./RelationMeta";
import { PackageMeta } from "./PackageMeta";
import { ClassMeta } from "./ClassMeta";
import { DiagramMeta } from "./DiagramMeta";
import { X6NodeMeta } from "./X6NodeMeta";
import { X6EdgeMeta } from "./X6EdgeMeta";
import { CodeMeta } from "./CodeMeta";

export interface MetaContent {
  packages: PackageMeta[];
  classes?: ClassMeta[];
  diagrams?: DiagramMeta[];
  relations: RelationMeta[];
  codes?: CodeMeta[];
  x6Nodes: X6NodeMeta[];
  x6Edges: X6EdgeMeta[];
}

export const CONST_ID = "id"