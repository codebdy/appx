import React, { useMemo } from 'react'
import { createBehavior, createResource } from '@designable/core'
import { createForm } from '@formily/core'
import { observer } from '@formily/react'
import { Form } from '@formily/antd'
import { usePrefix, DnFC } from '@designable/react'
import './styles.less'
import { FormLocales } from './locales'
import { createFieldSchema } from '../Field'
import { FormSchema } from './schema'
import { FormLayoutSchema } from '../FormLayoutDesigner/schema'
import { CSSStyle } from '../common'

export const FormDesigner: DnFC<React.ComponentProps<typeof Form>> = observer(
  (props) => {
    const prefix = usePrefix('designable-form')
    const form = useMemo(
      () =>
        createForm({
          designable: true,
        }),
      []
    )
    return (
      <Form
        {...props}
        style={{ ...props.style }}
        className={prefix}
        form={form}
      >
        {props.children}
      </Form>
    )
  }
)

FormDesigner.Behavior = createBehavior({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: FormSchema,
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    }
  },
  designerLocales: FormLocales,
})

FormDesigner.Resource = createResource({
  title: { 'zh-CN': '表单', 'en-US': 'Form' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Form',
      },
    },
  ],
})
