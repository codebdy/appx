import { ID } from "../../../../shared";

export enum ListNodeType {
  Category = "Category",
  Page = "Page"
}

export interface IListNode {
  uuid: string,
  nodeType: ListNodeType,
  pageId?: ID,
  title: string,
  children: string[],
}