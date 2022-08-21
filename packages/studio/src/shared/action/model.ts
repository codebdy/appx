export enum Events {
  onClick = "onClick"
}

export enum ActionType {
  RouteTo = "RouteTo",
  OpenDialog = "OpenDialog",
  OpenDrawer = "OpenDrawer",
  ConfirmDialog = "ConfirmDialog",
  SuccessMessage = "SuccessMessage",
  CloseModel = "CloseModel", //Dialog or Drawer
}

export interface IAction {
  actionType: ActionType,
}