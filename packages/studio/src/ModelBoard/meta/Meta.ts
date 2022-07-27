import { RelationMeta } from "./RelationMeta";
import { PackageMeta } from "./PackageMeta";
import { ClassMeta } from "./ClassMeta";
import { DiagramMeta } from "./DiagramMeta";
import { ID } from "../../shared";

export const EntityNameMeta = "Meta";

export enum MetaStatus {
  META_STATUS_PUBLISHED = "published",
  META_STATUS_CANCELLED = "cancelled",
  META_STATUS_MIGRATION_ERROR = "migrationError",
}

export interface Meta {
  id?: ID;
  appId?: ID;
  content: {
    packages: PackageMeta[];
    classes?: ClassMeta[];
    diagrams?: DiagramMeta[];
    relations: RelationMeta[];
  };
  status?: MetaStatus;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CONST_ID = "id"