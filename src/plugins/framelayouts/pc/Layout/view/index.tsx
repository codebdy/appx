import { observer } from "@formily/reactive-react"
import { Layout } from "antd"
import React from "react"

export interface IComponentProps {
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <Layout {...props} />
  )
})

export default Component;