import React, { memo } from "react";
import { useProTableParams } from "../context";
import { BatchActionsContainer } from "./BatchActionsContainer";

export interface ITableBatchActionsProps {
  children?: React.ReactNode
}

export const TableBatchActions = memo((
  props: ITableBatchActionsProps
) => {
  const { children } = props;
  const { selectedRowKeys } = useProTableParams();

  return (
    selectedRowKeys?.length
      ? <BatchActionsContainer>
        {children}
      </BatchActionsContainer>
      : <></>
  )
})
