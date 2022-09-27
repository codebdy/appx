import Component, { IButtonProps } from "../view";
import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react";
import React from "react";

const ComponentDesigner: DnFC<IButtonProps> = observer((props) => {
  const { onClick, ...other } = props;
  return <Component {...other} />
})

export default ComponentDesigner;
