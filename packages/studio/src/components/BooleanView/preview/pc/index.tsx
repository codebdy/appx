import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React from "react"
import { IconView } from "../../../../shared/icon/IconView"
import { CheckOutlined } from "@ant-design/icons"

export interface IBooleanViewProps {
  icon?: IIcon,
  value?: boolean,
  size?: number,
  shape?: "circle" | "square",
}

export const BooleanView = observer((props: IBooleanViewProps) => {
  const { icon, value, size, ...other } = props;
  return (
    <div {...other}>
      哈哈
      {
        value ? <CheckOutlined /> : ""
      }
    </div>
  )
})