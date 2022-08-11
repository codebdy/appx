import { IIconCategory } from "../../model";
import { directional } from "./directional";
import { editor } from "./editor";
import { suggested } from "./suggested";

export const outlinedIcons: IIconCategory = {
  name: "Outlined",
  iconGroups: [directional, suggested, editor]
}