import { IClassAuthConfig, IProperyAuthConfig } from "../../model";

export enum RowType {
  Package,
  Class,
  Field
}

export interface IAuthConfig {
  classUuid?: string;
  rowType: RowType;
  classConfig?: IClassAuthConfig;
  propertyConfig?: IProperyAuthConfig;
}
