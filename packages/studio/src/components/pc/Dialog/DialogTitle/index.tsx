import React from "react";

export interface IDialogTitleProps {
  className?: string,
  title?: string,
}

export const DialogTitle = (props: IDialogTitleProps) => {
  const { title, ...other } = props;
  return <div {...other}>
    {title}
  </div>
}