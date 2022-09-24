import { observer } from "@formily/reactive-react"
import { Layout } from "antd"
import React from "react"

const { Header } = Layout;

export interface IComponentProps {
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <Header {...props} />
  )
})

export default Component;