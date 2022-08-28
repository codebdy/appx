import { observer } from "@formily/reactive-react"
import { IDataBindSource } from "../../../datasource"
import React from "react"

export const ObjectPanel = observer((props: {
  dataBindSource: IDataBindSource,
  children?: React.ReactNode,
}) => {
  const { dataBindSource, children } = props;

  return (
    <>
      {props?.children}
    </>
  )
})

