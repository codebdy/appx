import { ArrayBase } from "@formily/antd"
import { usePrefixCls } from "@formily/antd/esm/__builtins__"
import React from "react"

export const TableIndex = (props)=>{
  const index = ArrayBase.useIndex()
  const prefixCls = usePrefixCls('formily-array-base')
  return (
    <span {...props} className={`${prefixCls}-index`}>
      #{index + 1}.
    </span>
  )
}