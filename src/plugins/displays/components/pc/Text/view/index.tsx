import { observer } from "@formily/reactive-react";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import React from "react";
import cls from 'classnames'

export interface ITextProps {
  value?: string
  content?: string
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p'
  style?: React.CSSProperties
  className?: string
}
const Component = observer((props: ITextProps) => {
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
    p(props.content || value)
  )
})

export default Component;