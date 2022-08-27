import { ID } from "..";

export enum Events {
  onClick = "onClick"
}

export enum ActionType {
  OpenPage = "OpenPage",
  ClosePage = "ClosePage",
  OpenDialog = "OpenDialog",
  CloseDialog = "CloseDialog",
  OpenDrawer = "OpenDrawer",
  CloseDrawer = "CloseDrawer",
  Confirm = "Confirm",
  SuccessMessage = "SuccessMessage",
  DeleteRecord = "DeleteRecord",
  UpdateRecord = "UpdateRecord",
  SaveData = "SaveData",
  Custimized = "Custimized"
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
  title?: string;
}

export interface ISaveDataAction {

}

export interface IAppxAction {
  uuid: string,
  title: string,
  actionType: ActionType,
  payload?: IOpenPageAction | ISaveDataAction,
}