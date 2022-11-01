import { observer } from "@formily/reactive-react";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import React, { useMemo } from "react";
import cls from 'classnames'
import moment from "moment";

export enum TextType {
  Number = "Number",
  Date = "Date",
  Text = "Text",
}

export interface ITextProps {
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
  style?: React.CSSProperties;
  className?: string;
  textType?: TextType;
  formatMask?: string;
}
const Component = observer((props: ITextProps) => {
  const { value, textType = TextType.Text, formatMask, ...other } = props;

  const tagName = props.mode === 'normal' || !props.mode ? 'div' : props.mode
  const p = useParseLangMessage();
  const text = useMemo(() => {
    const txtValue = props.content || value;
    if (textType === TextType.Date) {
      return moment(txtValue).format(formatMask || "YYYY-MM-DD HH:mm:ss");
    }

    return p(txtValue);
  }, [props.content, value])
  return React.createElement(
    tagName,
    {
      ...other,
      className: cls(props.className),
      value: p(value),
    },
    text
  )
})

export default Component;