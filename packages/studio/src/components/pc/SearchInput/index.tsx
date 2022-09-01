import { observer } from "@formily/reactive-react"
import { Input } from "antd"
import React from "react"

export const SearchInput = observer((props)=>{
  return (
    <Input {...props}/>
  )
})