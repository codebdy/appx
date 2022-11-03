import { observer } from '@formily/reactive-react'
import { FormCollapse, IFormTabProps } from '@formily/antd';
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
import React from 'react';

const Component = observer((props: IFormTabProps) => {
  //const { title, ...other } = props;
  const p = useParseLangMessage();

  return (
    <FormCollapse
      {...props}
    />
  )
})

export default Component;