import { observer } from "@formily/reactive-react"
import React from "react"

export interface IArrayPanelProps {
  value?: boolean,
  onChange?: (value?: boolean) => void,
  children?: React.ReactNode,
}

export const ArrayPanel = observer((props: IArrayPanelProps) => {
  const { value, onChange, children, ...other } = props;

  return (
    <div {...other}>
      {
       children
      }
    </div>
  )
})