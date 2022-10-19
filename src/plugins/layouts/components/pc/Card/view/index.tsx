import { observer } from '@formily/reactive-react'
import { Card as AntdCard, CardProps } from 'antd'
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
import React from 'react';

const Component = observer((props: CardProps) => {
  const { title, extra, ...other } = props;
  const p = useParseLangMessage();

  return (
    <AntdCard
      title={p(title as any)}
      extra={p(extra as any)}
      {...other}
    />
  )
})

export default Component;