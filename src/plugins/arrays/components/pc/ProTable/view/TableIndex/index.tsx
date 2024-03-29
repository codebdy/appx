import { ArrayBase } from "@formily/antd"
import { usePrefixCls } from "@formily/antd/esm/__builtins__"
import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import { useTableParams } from "~/plugin-sdk/contexts/table"

export const TableIndex = observer((props) => {
  const index = ArrayBase.useIndex()
  const params = useTableParams();
  const prefixCls = usePrefixCls('formily-array-base')
  const offset = useMemo(() => {
    const pageNumber = params.current ? (params.current - 1) : 0;
    const pageSize = params.pageSize || 10;

    return pageNumber * pageSize
  }, [params])
  return (
    <span {...props} className={`${prefixCls}-index`}>
      #{index + 1 + offset}.
    </span>
  )
})