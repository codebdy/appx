import { observer } from "@formily/reactive-react"
import React from "react"

export interface IComponentProps{
  className?: string;
}

const Component = observer((props:IComponentProps)=>{
  return (
    <div>
      呵呵啊
    </div>
  )
})

export default Component;