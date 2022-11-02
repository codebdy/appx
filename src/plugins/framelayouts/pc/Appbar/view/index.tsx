import { observer } from "@formily/reactive-react"
import React from "react"
import cls from "classnames"
import "./style.less"
import { Header } from "antd/lib/layout/layout"
import { useLayoutParams } from "~/plugin-sdk/contexts/layout"

export interface IComponentProps {
  fixed?: boolean,
  className?: string,
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  const { className, fixed = true, children, ...other } = props;
  const { scrolled } = useLayoutParams();
  return (
    <>
      <Header className={cls(className, "appx-appbar", "bottom-border", { "fixed": fixed }, { float: scrolled })} {...other}>
        {children}
      </Header>
      {
        fixed &&
        <Header className={cls(className, "appx-appbar")} {...other}></Header>
      }

    </>
  )
})

export default Component;