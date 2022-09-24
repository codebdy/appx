import { observer } from "@formily/reactive-react"
import { Layout } from "antd"
import React from "react"

const { Sider } = Layout;

export interface IComponentProps {
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <Sider {...props} />
  )
})

export default Component;