import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"

export interface IPopupPanelProps {
  className?: string,
  children?: React.ReactNode,
}

export const PopupPanel = observer((
  props: IPopupPanelProps
) => {
  const {className, ...other} = props;
  return (
    <div className = {cls(className, "dropdown-popup-panel")}{...other}>
    </div>
  )
})