import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import { IconView, IIcon } from "@rxdrag/plugin-sdk"
import { CheckOutlined } from "@ant-design/icons"

export interface IBooleanViewProps {
  trueIcon?: IIcon,
  falseIcon?: IIcon,
  value?: boolean,
}

export const BooleanView = observer((props: IBooleanViewProps) => {
  const { trueIcon, falseIcon, value, ...other } = props;
  const checkedIcon = useMemo(() => {
    return trueIcon ? <IconView icon={trueIcon} /> : <CheckOutlined />
  }, [trueIcon])

  const uncheckedIcon = useMemo(() => {
    return falseIcon ? <IconView icon={falseIcon} /> : ""
  }, [falseIcon])

  return (
    <div {...other}>
      {
        value ? checkedIcon : uncheckedIcon
      }
    </div>
  )
})