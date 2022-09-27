import { DnFC } from '@designable/react'
import { observer } from '@formily/reactive-react'
import React from 'react'
import { BooleanView, IBooleanViewProps } from '../view';

export const BooleanViewDesigner: DnFC<IBooleanViewProps> = observer((props: IBooleanViewProps) => {
  const {value, ...other} = props;
  return (
    <BooleanView value={true} {...other} />
  )
})
