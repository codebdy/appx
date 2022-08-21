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
  DeleteRecord = "DeltedRecord",
  UpdateRecord = "UpdateRecord",
  SaveData = "SaveData"
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

export interface IAction {
  actionType: ActionType,
  payload?: IOpenPageAction,
}