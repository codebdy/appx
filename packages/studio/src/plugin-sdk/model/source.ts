import { ISchema } from "@formily/json-schema"

export interface IMaterialSchema {
  tabs: ISchemaTab[],
}

export interface ISchemaTab {
  collapses: ICollapseItem[]
}

export interface ICollapseItem {
  [key: string]: ISchema
}
