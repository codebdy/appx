import { DnFC } from '@designable/react'
import { observer } from "@formily/reactive-react";
import React from "react";
import { Button, ButtonProps } from '../../view/Button';

const ComponentDesigner: DnFC<ButtonProps> = observer((props) => {
  const {  onClick, ...other } = props;

  return <Button {...other}>
  </Button>
})

export default ComponentDesigner;
