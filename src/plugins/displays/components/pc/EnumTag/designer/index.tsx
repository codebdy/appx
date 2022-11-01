import { DnFC, useTreeNode } from '@designable/react'
import { observer } from '@formily/reactive-react'
import React from 'react'
import { IEnumTagsProps } from '../view'

export const EnumTagDesigner: DnFC<IEnumTagsProps> = observer((props: IEnumTagsProps) => {
  const { value, ...other } = props;
  const node = useTreeNode()
  return (
    <div {...other}>
      {node.props?.["x-field-source"]?.name || "EnumTag"}
    </div>
  )
})

