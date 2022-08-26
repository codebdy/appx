import { observer } from "@formily/reactive-react"
import React, { useCallback } from "react"
import {
  useField,
} from '@formily/react'
import { Field, GeneralField, isField } from "@formily/core";
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import { isStr } from "@formily/shared";

export interface ITextViewProps {
  inherited?: boolean,
}
export const TextView = observer((
  props: ITextViewProps
) => {
  const { inherited = true } = props;
  const field = useField();
  const getParentField = useCallback((field: GeneralField) => {
    if (field?.parent) {
      if (isField(field.parent)) {
        return field?.parent
      }
      else {
        return getParentField(field?.parent)
      }
    }

    return undefined;
  }, [])
  const datatField = (inherited ? getParentField(field) : field) as Field
  const p = useParseLangMessage();
  return (
    <>
      {isStr(datatField?.value) ? p(datatField?.value) : datatField?.value}
    </>
  )
})