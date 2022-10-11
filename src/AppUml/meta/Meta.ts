import { RelationMeta } from "./RelationMeta";
import { PackageMeta } from "./PackageMeta";
import { ClassMeta } from "./ClassMeta";
import { DiagramMeta } from "./DiagramMeta";
import { ID } from "../../shared";
import { X6NodeMeta } from "./X6NodeMeta";
import { X6EdgeMeta } from "./X6EdgeMeta";
import { CodeMeta } from "./CodeMeta";

export const EntityNameMeta = "Meta";

export enum MetaStatus {
  META_STATUS_PUBLISHED = "published",
  META_STATUS_CANCELLED = "cancelled",
  META_STATUS_MIGRATION_ERROR = "migrationError",
}

export interface Meta {
  id?: ID;
  appUuid?: ID;
  content: {
    packages: PackageMeta[];
    classes?: ClassMeta[];
    diagrams?: DiagramMeta[];
    relations: RelationMeta[];
    codes?: CodeMeta[];
    x6Nodes: X6NodeMeta[];
    x6Edges: X6EdgeMeta[];
  };
  status?: MetaStatus;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CONST_ID = "id"