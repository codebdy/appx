import { observer } from "@formily/reactive-react"
import React, { useMemo } from "react"
import { useParseLangMessage } from "~/plugin-sdk";

export interface IEnumTagsProps {
  value?: string | string[]
}

export const EnumTag = observer((props: IEnumTagsProps) => {
  const { value, ...other } = props;
  const p = useParseLangMessage();

  return (
    <div {...other}>
      {value}
    </div>
  )
})