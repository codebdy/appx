import { atomFamily } from "recoil";
import { ID } from "../../shared";
import { IMenuNode } from "../../plugin-sdk/model/IMenuNode";

export interface INavigationSnapshot {
  rootNode: IMenuNode | undefined;
  nodes: IMenuNode[];
  selectedId: string | undefined;
}

export const menuIdState= atomFamily<ID, string>({
  key: "navigationEditor.MenuId",
  default: undefined,
});

export const isNavigationDirtyState = atomFamily<boolean, string>({
  key: "navigationEditor.isDirty",
  default: false,
});

export const navigationNodesState = atomFamily<IMenuNode[], string>({
  key: "navigationEditor.nodes",
  default: [],
});

export const navigationRootNodeState = atomFamily<IMenuNode | undefined, string>({
  key: "navigationEditor.rootNode",
  default: undefined,
});

export const navigationSelectedIdState = atomFamily<string | undefined, string>({
  key: "navigationEditor.selectedId",
  default: undefined,
});

export const undoListState = atomFamily<INavigationSnapshot[], string>({
  key: "navigationEditor.undo",
  default: [],
});

export const redoListState = atomFamily<INavigationSnapshot[], string>({
  key: "navigationEditor.redo",
  default: [],
});
