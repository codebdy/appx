import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import { CheckOutlined } from "@ant-design/icons"

export interface IEnumTagsProps {
}

export const EnumTags = observer((props: IEnumTagsProps) => {
  const { ...other } = props;

  return (
    <div {...other}>
    </div>
  )
})