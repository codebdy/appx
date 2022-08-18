

export enum FieldSourceType {
  Attribute = "Attribute",
  Method = "Method",
  Association = "Association"
}

export interface IFieldSource {
  name: string;
  label?: string;
  typeUuid?: string;
  sourceType: FieldSourceType;
}