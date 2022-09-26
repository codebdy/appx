import React from 'react'
import { DnFC } from '@designable/react'
import Component from '../view'
import { observer } from '@formily/reactive-react'

const ComponentDesigner: DnFC<React.ComponentProps<typeof Component>> = observer((
  props
) => {
  const { dataBind, ...other } = props;
  return (
    <Component {...other} />
  )
})

export default ComponentDesigner;
