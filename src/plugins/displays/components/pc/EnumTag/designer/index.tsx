import { DnFC } from '@designable/react'
import { observer } from '@formily/reactive-react'
import React from 'react'
import { EnumTag, IEnumTagsProps } from '../view'

export const EnumTagDesigner: DnFC<IEnumTagsProps> = observer((props: IEnumTagsProps) => {
  const {value, ...other} = props;
  return (
    <EnumTag {...other} />
  )
})

