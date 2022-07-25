import { RelationMeta } from "./RelationMeta";
import { PackageMeta } from "./PackageMeta";

export const EntityNameMeta = "Meta";

export enum MetaStatus {
  META_STATUS_PUBLISHED = "published",
  META_STATUS_CANCELLED = "cancelled",
  META_STATUS_MIGRATION_ERROR = "migrationError",
  META_STATUS_ROLLBACK_ERROR = "rollbackError",
}

export interface Meta {
  id?: number;
  content: {
    packages: PackageMeta[];
    relations: RelationMeta[];
  };
  status?: MetaStatus;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CONST_ID = "id"