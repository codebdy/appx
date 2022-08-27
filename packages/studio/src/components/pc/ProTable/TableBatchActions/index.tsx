import React, { memo, useCallback } from "react";
import { useProTableParams } from "../context";
import { BatchActionsContainer } from "./BatchActionsContainer";

export interface ITableBatchActionsProps {
  children?: React.ReactNode
}

export const TableBatchActions = memo((
  props: ITableBatchActionsProps
) => {
  const { children } = props;
  const { selectedRowKeys, onSelectedChange } = useProTableParams();

  const handleClear = useCallback(() => {
    onSelectedChange([])
  }, [onSelectedChange])

  return (
    selectedRowKeys?.length
      ? <BatchActionsContainer counts={selectedRowKeys.length} onClear={handleClear}>
        {children}
      </BatchActionsContainer>
      : <></>
  )
})
