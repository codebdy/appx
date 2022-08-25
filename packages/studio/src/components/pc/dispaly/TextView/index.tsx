import { observer } from "@formily/reactive-react"
import React from "react"
import {
  useField,
} from '@formily/react'

export const TextView = observer(()=>{
  const field = useField();
  console.log("哈哈", field.path.toString(), field.parent?.path.toString());
  return (
    <>
      {field.data}
    </>
  )
})