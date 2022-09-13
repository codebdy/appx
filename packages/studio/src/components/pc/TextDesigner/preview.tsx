import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import cls from 'classnames'
import './styles.less'
import { TextSchema } from './schema'
import { TextLocales } from './locales'
import { createFieldSchema } from "../../common/Field/shared"
import { ITextProps } from '../Text'
import { useParseLangMessage } from '../../../hooks/useParseLangMessage'

export const TextDesigner: DnFC<ITextProps> = (props) => {
  const { value, ...other } = props;
  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
  const p = useParseLangMessage();
  return React.createElement(
    tagName,
    {
      ...other,
      className: cls(props.className, 'dn-text'),
      value: p(value),
    },
    p(props.content)
  )
}

TextDesigner.Behavior = createBehavior({
  name: 'Text',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Text',
  designerProps: {
    propsSchema: createFieldSchema(TextSchema),
  },
  designerLocales: TextLocales,
})

TextDesigner.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Text',
      },
    },
  ],
})
