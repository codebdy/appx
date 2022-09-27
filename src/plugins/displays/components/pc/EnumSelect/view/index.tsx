import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import { CheckOutlined } from "@ant-design/icons"

export interface IEnumSelectProps {
}

export const EnumSelect = observer((props: IEnumSelectProps) => {
  const { ...other } = props;

  return (
    <div {...other}>
    </div>
  )
})