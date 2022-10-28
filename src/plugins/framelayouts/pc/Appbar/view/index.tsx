import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"
import { Header } from "antd/lib/layout/layout"

export interface IComponentProps {
  className?: string,
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  const { className } = props;
  return (
    <Header className={cls(className, "appx-appbar", "bottom-border")} {...props}/>
  )
})

export default Component;