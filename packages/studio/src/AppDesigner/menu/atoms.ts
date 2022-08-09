import { atom } from "recoil";
import { IMenuNode } from "./models/IMenuNode";

export interface INavigationSnapshot {
  rootNode: IMenuNode | undefined;
  nodes: IMenuNode[];
  selectedId: string | undefined;
}

export const isNavigationDirtyState = atom<boolean>({
  key: "navigationEditor.isDirty",
  default: false,
});

export const navigationNodesState = atom<IMenuNode[]>({
  key: "navigationEditor.nodes",
  default: [],
});

export const navigationRootNodeState = atom<IMenuNode | undefined>({
  key: "navigationEditor.rootNode",
  default: undefined,
});

export const navigationSelectedIdState = atom<string | undefined>({
  key: "navigationEditor.selectedId",
  default: undefined,
});

export const undoListState = atom<INavigationSnapshot[]>({
  key: "navigationEditor.undo",
  default: [],
});

export const redoListState = atom<INavigationSnapshot[]>({
  key: "navigationEditor.redo",
  default: [],
});
