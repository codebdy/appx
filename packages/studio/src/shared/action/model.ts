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
  pageUuid?: string,
}

export interface ISaveDataAction {

}

export interface IAppxAction {
  uuid: string,
  title: string,
  actionType: ActionType,
  payload?: IOpenPageAction | ISaveDataAction,
}