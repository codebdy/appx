import { observer } from "@formily/reactive-react"
import React, { CSSProperties } from "react"

export interface IComponentProps {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <div {...props} />
  )
})

export default Component;