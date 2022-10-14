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

export interface IPropertyAuthConfig extends IModelAuthConfig {
  propertyUuid?: string;
}

// input
export interface IAuthConfigInput {
  id?: ID;
  appUuid?: string;
  roleId?: ID;
}

export interface IModelAuthConfigInput extends IAuthConfigInput {
  canRead?: boolean;
  readExpression?: string;
  canUpdate?: boolean;
  updateExpression?: string;
  canDelete?: boolean;
  deleteExpression?: string;
  classUuid?: string;
}

export interface IClassAuthConfigInput extends IModelAuthConfigInput {
  expanded?: boolean;
  canCreate?: boolean;
  createExpression?: string;
}

export interface IPropertyAuthConfigInput extends IModelAuthConfigInput {
  propertyUuid?: string;
}