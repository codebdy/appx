import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React, { useMemo } from "react"
import { IconView } from "../../../../shared/icon/IconView"
import { CheckOutlined } from "@ant-design/icons"

export interface ITagProps {
  trueIcon?: IIcon,
  falseIcon?: IIcon,
  value?: boolean,
}

export const Tag = observer((props: ITagProps) => {
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