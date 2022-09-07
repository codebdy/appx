import { BaseDataType } from "../../shared/BaseDataType";


export enum FieldSourceType {
  Attribute = "Attribute",
  Method = "Method",
  Association = "Association"
}

export enum AssociationType {
  HasMany = "HasMany",
  HasOne = "HasOne"
}

export interface IFieldSource {
  name: string;
  label?: string;
  typeUuid?: string;
  typeEntityName?: string;
  sourceType: FieldSourceType;
  dataType?: BaseDataType;
  associationType?: AssociationType,
}