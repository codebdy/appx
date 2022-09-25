import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"
import "./style.less"
import cls from "classnames"

export enum FlexFlow {
  column = "column",
  row = "row"
}

export interface IComponentProps {
  root?: boolean,
  flexFlow?: FlexFlow,
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode,
}

const Component = observer((props: IComponentProps) => {
  const { root, flexFlow = FlexFlow.column, className, style, ...other } = props;
  return (
    <div
      className={cls("appx-layout", className, { root: root })}
      style={{ flexFlow: flexFlow, ...style }}
      {...other}
    />
  )
})

export default Component;