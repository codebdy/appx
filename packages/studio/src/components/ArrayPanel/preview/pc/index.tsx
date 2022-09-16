import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React, { useMemo } from "react"
import { IconView } from "../../../../shared/icon/IconView"
import { CheckOutlined } from "@ant-design/icons"

export interface IArrayPanelProps {
  trueIcon?: IIcon,
  falseIcon?: IIcon,
  value?: boolean,
  children?: React.ReactNode,
}

export const ArrayPanel = observer((props: IArrayPanelProps) => {
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