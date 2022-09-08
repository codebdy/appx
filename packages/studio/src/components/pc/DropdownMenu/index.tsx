import { observer } from "@formily/reactive-react"
import { IIcon } from '../../../shared/icon/model'
import React from "react"
import { MenuItem } from "./MenuItem"

export interface IDropdownMenuProps {

}

export interface IDropdownMenuItemProps {
  title?: string,
  icon?: IIcon,
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