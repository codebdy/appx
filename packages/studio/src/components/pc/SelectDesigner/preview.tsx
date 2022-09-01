import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { SelectSchema } from './schema'
import { createFieldSchema, FieldsType } from "../../common/Field/shared"
import { SelectLocales } from './locales'
import { Select } from '../Select'
import { observer } from '@formily/reactive-react'

export const SelectDesigner: DnFC<React.ComponentProps<typeof Select>> = observer((
  props
) => {
  const { dataBind, ...other } = props;
  return (
    <Select {...other} />
  )
})

SelectDesigner.Behavior = createBehavior({
  name: 'Select',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Select',
  designerProps: {
    propsSchema: createFieldSchema(SelectSchema, { fieldSourceType: FieldsType.Single, hasDataBindSource: true }),
  },
  designerLocales: SelectLocales,
})

SelectDesigner.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Select',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        'x-component-props': {
          'labelField': 'name',
          'valueField': 'id',
        }
      },
    },
  ],
})
