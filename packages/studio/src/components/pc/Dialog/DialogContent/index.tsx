import React from "react"

export interface IDialogContentProps {
  className?: string,
  children?: React.ReactNode,
}

export const DialogContent = (props: IDialogContentProps) => {
  const { children, ...other } = props;
  return <div {...other}>
    {children}
  </div>
}