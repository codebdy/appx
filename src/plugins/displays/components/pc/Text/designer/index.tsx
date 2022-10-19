import React from 'react'
import { DnFC, useTreeNode } from '@designable/react'
import cls from 'classnames'
import './styles.less'
import { ITextProps } from '../view'
import { useParseLangMessage } from '@rxdrag/plugin-sdk'

const ComponentDesigner: DnFC<ITextProps> = (props) => {
  const { value, ...other } = props;
  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
  const p = useParseLangMessage();
  const node = useTreeNode()

  return React.createElement(
    tagName,
    {
      ...other,
      className: cls(props.className, 'dn-text'),
      value: p(value),
    },
    p(props.content) || node.props?.["x-field-source"]?.name
  )
}

export default ComponentDesigner;
