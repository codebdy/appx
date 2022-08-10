import { ID } from "../../../shared";

export enum MenuItemType {
  Group = "Group",
  Divider = "Divider",
  Link = "Link",
  Item = "Item",
}

export interface IMenuBadge {
  color?: "primary" | "secondary" | "default";
  field?: string;
  size?: "small" | "medium";
}

export interface IMenuItem {
  type: MenuItemType;
  title?: string;
  icon?: string;
  badge?: IMenuBadge;
  //chip?:IMenuChip,
  children?: Array<IMenuItem>;
  //auths?: RxAuth[];
  route?: {
    pageId?: ID;
    payload?: any;
  };
}

export interface IMenuNode {
  id: string;
  parentId?: string;
  childIds: string[];
  meta: IMenuItem;
}
