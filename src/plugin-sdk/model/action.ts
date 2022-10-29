import { ID } from "~/shared";

export enum Events {
  onClick = "onClick"
}

export enum ActionType {
  OpenPage = "OpenPage",
  ClosePage = "ClosePage",
  OpenDialog = "OpenDialog",
  CloseDialog = "CloseDialog",
  Navigate = "Navigate",
  //OpenDrawer = "OpenDrawer",
  //CloseDrawer = "CloseDrawer",
  Confirm = "Confirm",
  SuccessMessage = "SuccessMessage",
  DeleteData = "DeleteData",
  SaveData = "SaveData",
  BatchUpdate = "BatchUpdate",
  BatchDelete = "BatchDelete",
  Reset = "Reset",
  Custimized = "Custimized",
  SubmitSearch = "SubmitSearch",
  OpenFile = "OpenFile",
  Graphql = "Graphql"
}

export enum OpenPageType {
  RouteTo = "RouteTo",
  Dialog = "Dialog",
  Drawer = "Drawer"
}

export interface IOpenPageAction {
  openType: OpenPageType,
  pageId?: ID,
  width?: number | string;
  height?: number | string;
  placement?: "top" | "right" | "bottom" | "left";
  pageTitle?: string;
}

export interface ISuccessAction {
  message?: string;
}

export interface IConfirmAction {
  boxTitle?: string;
  message?: string;
}

export interface INavigateAction {
  route?: string;
}


export interface IAppxAction {
  uuid: string,
  title: string,
  actionType: ActionType,
  payload?: IOpenPageAction | ISuccessAction | IConfirmAction | INavigateAction,
}