import { IClassAuthConfig, IProperyAuthConfig } from "../../model";

export enum RowType {
  Package,
  Class,
  Atrribute,
}

export interface IAuthConfig {
  classUuid?: string;
  attributeUuid?: string;
  rowType: RowType;
  classConfig?: IClassAuthConfig;
  propertyConfig?: IProperyAuthConfig;
}
