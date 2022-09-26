import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"

export interface IComponentProps {
  className?: string
}

const Component = observer((props: IComponentProps) => {
  const { className, ...other } = props;
  return (
    <div className={cls(className, "appx-spring")} {...other} />
  )
})

export default Component;