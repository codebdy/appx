import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"

export interface IEnumTagsProps {
  value?: string | string[]
}

export const EnumTag = observer((props: IEnumTagsProps) => {
  const { ...other } = props;

  return (
    <div {...other}>
    </div>
  )
})