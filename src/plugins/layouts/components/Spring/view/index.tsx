import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"

export interface IComponentProps {
  style?: CSSProperties
}

const Component = observer((props: IComponentProps) => {
  const { style, ...other } = props;
  return (
    <div {...other} style={{ flex: 1, ...style }} />
  )
})

export default Component;