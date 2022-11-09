import { DeleteOutlined } from "@ant-design/icons"
import { Button } from "antd"
import React, { useCallback } from "react"
import { memo } from "react"
import { useShowError } from "~/AppDesigner/hooks/useShowError"
import { useDeleteTemplate } from "~/AppDesigner/UiDesigner/hooks/useDeleteTemplate"
import { ITemplateInfo } from "~/model"

export const DeleteTemplateButton = memo((
  props: {
    template: ITemplateInfo
  }
) => {
  const { template } = props;
  const [doDelete, { loading, error }] = useDeleteTemplate();

  useShowError(error);

  const handleClick = useCallback(() => {
    doDelete(template.id)
  }, [doDelete])

  return (
    <Button
      type="text"
      shape="circle"
      icon={<DeleteOutlined />}
      loading={loading}
      onClick={handleClick}
    ></Button>
  )
})