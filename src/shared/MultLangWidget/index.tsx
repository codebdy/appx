import React from "react"
import { memo } from "react"
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";

const MultLangWidget = memo((
  props: {
    value?: string
  }
) => {
  const { value } = props;
  const parse = useParseLangMessage();
  return (
    <>{parse(value)}</>
  )
})

export default MultLangWidget;