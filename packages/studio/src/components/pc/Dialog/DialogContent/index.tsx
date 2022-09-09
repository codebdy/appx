import { useInstanceParams } from "../../../../shared/contexts/instance";
import React from "react"
import { observer } from "@formily/reactive-react";

export interface IDialogContentProps {
  className?: string,
  children?: React.ReactNode,
}

export const DialogContent = observer((props: IDialogContentProps) => {
  const { children, ...other } = props;
  const { field, entityName, instance } = useInstanceParams();
  console.log("呵呵", field, entityName, instance)
  return <div {...other}>
    {children}
  </div>
})