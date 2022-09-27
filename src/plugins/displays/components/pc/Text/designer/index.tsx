import React from 'react'
import { DnFC } from '@designable/react'
import cls from 'classnames'
import './styles.less'
import { ITextProps } from '../view'
import { useParseLangMessage } from '../../../../../../plugin-sdk'

const ComponentDesigner: DnFC<ITextProps> = (props) => {
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

export default ComponentDesigner;
