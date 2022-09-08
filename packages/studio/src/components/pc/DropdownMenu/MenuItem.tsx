import { observer } from "@formily/reactive-react"
import React from "react"
import { IIcon } from '../../../shared/icon/model'

export interface IDropdownMenuItemProps {
  title?: string,
  icon?: IIcon,
  className?: string,
  onClick?: ()=>void,
}
export const MenuItem = observer((props:IDropdownMenuItemProps)=>{
  return (
    <>
    ddd</>
  )
})