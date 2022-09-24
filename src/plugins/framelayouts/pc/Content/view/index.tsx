import { observer } from "@formily/reactive-react"
import { Layout } from "antd"
import React from "react"

const { Content } = Layout;

export interface IComponentProps {
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <Content {...props} />
  )
})

export default Component;