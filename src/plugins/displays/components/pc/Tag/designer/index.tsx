import { DnFC } from '@designable/react'
import { Tag, ITagProps } from '../view'
import { observer } from '@formily/reactive-react'
import React from 'react'

export const TagDesigner: DnFC<ITagProps> = observer((props: ITagProps) => {
  const { value, ...other } = props;
  return (
    <Tag {...other} value="Tag" />
  )
})

