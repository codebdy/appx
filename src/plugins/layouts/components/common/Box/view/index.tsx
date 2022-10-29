import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"
import "./style.less"
import cls from "classnames"

export interface IComponentProps {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  const { className, ...other } = props;
  return (
    <div className={cls("appx-box", className)} {...other} />
  )
})

export default Component;