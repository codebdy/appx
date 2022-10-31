import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"
import "./style.less"
import cls from "classnames"
import { IAppxAction } from "~/plugin-sdk"

export interface IComponentProps {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
  onClick?: IAppxAction[],
  cursor?: string,
}

const Component = observer((props: IComponentProps) => {
  const { className, onClick, cursor, style, ...other } = props;
  return (
    <div
      className={cls("appx-box", className)}
      style={{ cursor, ...style }}
      {...other}
    />
  )
})

export default Component;