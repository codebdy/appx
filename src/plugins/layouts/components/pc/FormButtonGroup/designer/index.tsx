import { DnFC } from '@designable/react'
import FormButtonGroup, { IFormButtonGroupProps } from "../view";
import React from 'react';
import { observer } from '@formily/reactive-react';
import { DroppableWidget } from "@designable/react"

const FormButtonGroupDesigner: DnFC<IFormButtonGroupProps> = observer((props) => {
  const { sticky, children, ...others } = props;

  return (
    props.children
      ?
      <FormButtonGroup {...others}>
        {children}
      </FormButtonGroup>
      :
      <DroppableWidget >
        {children}
      </DroppableWidget>
  )
});

export default FormButtonGroupDesigner;
