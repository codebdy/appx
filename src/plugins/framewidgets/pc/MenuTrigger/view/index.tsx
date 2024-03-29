import { observer } from "@formily/reactive-react"
import React from "react"


export interface IComponentProps {
}

const Component = observer((props: IComponentProps) => {
  return (
    <div {...props}>
      AppMenu
    </div>
  )
})

export default Component;