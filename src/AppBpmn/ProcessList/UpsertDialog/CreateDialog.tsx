import { PlusOutlined } from "@ant-design/icons"
import { Button, Form } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { IProcessInput, ProcessType } from "../../../model/process"
import { ID } from "../../../shared"
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
  const { t } = useTranslation();
  const [form] = Form.useForm<IProcessInput>();

  useEffect(() => {
    form.setFieldValue("type", processType)
  }, [processType, form])

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
      <UpsertModal open={open} onOpenChange={handleOpenChange} />
    </>
  )
})