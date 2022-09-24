import { observer } from "@formily/reactive-react"
import React from "react"

export interface IComponentProps {
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <div {...props} />
  )
})

export default Component;