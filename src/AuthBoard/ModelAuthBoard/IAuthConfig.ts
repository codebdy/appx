
export enum RowType {
  Package,
  Class,
  Field
}

export interface IAuthConfig {
  rowType: RowType;
}
