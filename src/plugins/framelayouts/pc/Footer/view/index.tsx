import { observer } from "@formily/reactive-react"
import { Layout } from "antd"
import React from "react"

const { Footer } = Layout;

export interface IComponentProps {
  children?: React.ReactNode
}

const Component = observer((props: IComponentProps) => {
  return (
    <Footer {...props} />
  )
})

export default Component;