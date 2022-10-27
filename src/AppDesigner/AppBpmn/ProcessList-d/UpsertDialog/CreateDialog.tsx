import { PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React, { memo, useCallback, useState } from "react"
import { ProcessType } from "~/model/process"
import { ID } from "~/shared"
import { UpsertModal } from "./UpsertModal"

export const CreateDialog = memo((
  props: {
    processId?: ID,
    processType?: ProcessType,
    onOpenChange?: (open?: boolean) => void,
  }
) => {
  const { processId, processType, onOpenChange } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
    onOpenChange(true);
  }, [])

  const handleOpenChange = useCallback((open?: boolean) => {
    setOpen(open);
    onOpenChange(open);
  }, [onOpenChange]);

  return (
    <>
      <Button
        shape="circle"
        type="text"
        size="small"
        icon={<PlusOutlined />}
        onClick={handleOpen}
      ></Button>
      <UpsertModal
        processType={processType}
        open={open}
        onOpenChange={handleOpenChange}
      />
    </>
  )
})