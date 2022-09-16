import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React from "react"
import { IconView } from "../../../../shared/icon/IconView"
import { Tag as AntdTag } from "antd"
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage"
import { isNum, isStr } from "@formily/shared"

export interface ITagProps {
  icon?: IIcon,
  value?: string,
  onChange?: (value?: string) => void,
}

export const Tag = observer((props: ITagProps) => {
  const { icon, value, onChange, ...other } = props;
  const p = useParseLangMessage();
  if(!isStr(value) && !isNum(value)){
    console.error("Tag value is not string or number")
    return <></>
  }
  return (
    <AntdTag {...other} icon = {icon && <IconView icon={icon} />}>
      {
        p(value)
      }
    </AntdTag>
  )
})