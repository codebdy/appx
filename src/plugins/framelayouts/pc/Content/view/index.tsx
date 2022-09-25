import { observer } from "@formily/reactive-react"
import React from "react"
import "./style.less"
import cls from "classnames"

export interface IComponentProps {
  className?: string,
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  const {className, ...other} = props; 
  return (
    <div className={cls(className, "appx-content")} {...other}>
      Content
    </div>
  )
})

export default Component;