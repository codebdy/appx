import { observer } from "@formily/reactive-react"
import { IIcon } from '../../../shared/icon/model'
import React, { CSSProperties } from "react"
import { IDropdownMenuItemProps, MenuItem } from "./MenuItem"

export interface IDropdownMenuProps {
  title?: string,
  icon?: IIcon,
  style?: CSSProperties,
  showDropdownIcon?: boolean,
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
}

export const DropdownMenu: React.FC<IDropdownMenuProps> & {
  Item?: React.FC<IDropdownMenuItemProps>
} = observer(() => {
  return (
    <>
      是分为氛围
    </>
  )
})

DropdownMenu.Item = MenuItem