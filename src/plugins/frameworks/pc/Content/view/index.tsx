import { observer } from "@formily/reactive-react"
import React from "react"

export interface ICompoentProps {
  children?: React.ReactNode,
}

const Component = observer(() => {
  return (
    <div>
      呵呵啊
    </div>
  )
})

export default Component;