import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import React from "react";

export interface IDialogTitleProps {
  className?: string,
  title?: string,
}

export const DialogTitle = (props: IDialogTitleProps) => {
  const { title, ...other } = props;
  const p = useParseLangMessage();
  return <div {...other}>
    {p(title)}
  </div>
}