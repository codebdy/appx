/**
 * 字段类型，目前版本仅支持这些类型，后续可以扩展
 */
export enum Type {
  ID = "ID",
  Int = "Int",
  Float = "Float",
  Boolean = "Boolean",
  String = "String",
  Date = "Date",
  Enum = "Enum",
  JSON = "JSON",
  ValueObject = "ValueObject",
  Entity = "Entity",
  
  IDArray = "ID[]",
  IntArray = "Int[]",
  FloatArray = "Float[]",
  StringArray = "String[]",
  DateArray = "Date[]",
  EnumArray = "EnumArray",
  ValueObjectArray = "ValueObjectArray",
  EntityArray = "EntityArray",
  File = "File"
}
