import React from 'react'
import { DnFC } from '@designable/react'
import { Select } from '../view'
import { observer } from '@formily/reactive-react'

const ComponentDesigner: DnFC<React.ComponentProps<typeof Select>> = observer((
  props
) => {
  const { dataBind, ...other } = props;
  return (
    <Select {...other} />
  )
})

export default ComponentDesigner;
