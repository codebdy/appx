import React, { useCallback, useState } from "react"
import { memo } from "react"
import { ProcessType } from "../../model/process"
import TreeNodeLabel from "../../common/TreeNodeLabel"
import { CreateDialog } from "./UpsertDialog/CreateDialog"

export const CategoryLabel = memo((
  props: {
    title: string,
    processType?: ProcessType,
  }
) => {
  const { title,  processType} = props;
  const [open, setOpen] = useState(false);

  const handleOpenChange = useCallback((open?: boolean) => {
    setOpen(open)
  }, [])

  return (
    <TreeNodeLabel
      fixedAction={open}
      action={
        <CreateDialog onOpenChange={handleOpenChange} processType= {processType} />
      }
    >
      <div>{title}</div>
    </TreeNodeLabel>
  )
})