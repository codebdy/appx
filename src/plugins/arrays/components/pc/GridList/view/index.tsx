import { observer } from '@formily/reactive-react'
import { Card as AntdCard, CardProps } from 'antd'
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
import React from 'react';
import "./style.less"

const Component = observer((props: CardProps) => {
  const { title, extra, ...other } = props;
  const p = useParseLangMessage();

  return (
    <div>

    </div>
  )
})

export default Component;