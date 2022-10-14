import { IClassAuthConfig, IProperyAuthConfig } from "../../model";

export enum RowType {
  Package,
  Class,
  Field
}

export interface IAuthConfig {
  rowType: RowType;
  classConfig?: IClassAuthConfig;
  propertyConfig?: IProperyAuthConfig;
}
