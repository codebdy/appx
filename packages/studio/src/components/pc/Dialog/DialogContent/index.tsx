import React from "react"
import { observer } from "@formily/reactive-react";

export interface IDialogContentProps {
  className?: string,
  children?: React.ReactNode,
}

export const DialogContent = observer((props: IDialogContentProps) => {
  const { children, ...other } = props;
  return <div {...other}>
    {children}
  </div>
})