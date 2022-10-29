import { useField } from "@formily/react";
import { observer } from "@formily/reactive-react"
import React from "react"

export const ItemRoot = observer((
  props: {
    children?: React.ReactNode,
    value?: any,
  }
) => {
  const { children, value } = props;
  const field = useField();

  console.log("哈哈哈哈哈", field, field.path.toString(), value)

  return (
    <>
      {children}
    </>
  )
})