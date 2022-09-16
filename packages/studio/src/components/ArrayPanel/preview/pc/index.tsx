import { observer } from "@formily/reactive-react"
import React from "react"

export interface IArrayPanelProps {
  value?: boolean,
  onChange?: (value?: boolean) => void,
}

export const ArrayPanel = observer((props: IArrayPanelProps) => {
  const { value, onChange, ...other } = props;

  return (
    <div {...other}>
      {
      }
    </div>
  )
})