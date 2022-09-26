import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"
import "./style.less"
import cls from "classnames"

export enum FlexFlow {
  column = "column",
  row = "row"
}

export interface IComponentProps {
  flexFlow?: FlexFlow,
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode,
}

const Component = observer((props: IComponentProps) => {
  const { flexFlow = FlexFlow.row, className, style, ...other } = props;
  return (
    <div
      className={cls("appx-flex-box", className)}
      style={{ flexFlow: flexFlow, ...style }}
      {...other}
    />
  )
})

export default Component;