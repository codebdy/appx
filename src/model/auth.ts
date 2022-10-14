import { ID } from "../shared";

export interface IAuthConfig {
  id: ID;
  appUuid: string;
  roleId: ID;
}

export interface IModelAuthConfig extends IAuthConfig {
  canRead?: boolean;
  readExpression?: string;
  canUpdate?: boolean;
  updateExpression?: string;
  canDelete?: boolean;
  deleteExpression?: string;
}

export interface IClassAuthConfig extends IModelAuthConfig {
  expanded?: boolean;
  canCreate?: boolean;
  createExpression?: string;
  classUuid?: string;
}

export interface IProperyAuthConfig extends IModelAuthConfig {
  propertyUuid?: string;
}