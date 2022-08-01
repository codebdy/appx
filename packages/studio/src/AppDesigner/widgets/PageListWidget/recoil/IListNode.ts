export enum ListNodeType {
  Category = "Category",
  Page = "Page"
}

export interface IListNode {
  nodeType: ListNodeType,
  pageUuid?: string,
  title: string,
  children: string[],
}