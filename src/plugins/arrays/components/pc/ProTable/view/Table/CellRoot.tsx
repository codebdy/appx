import { Field } from '@formily/core';
import { useField } from '@formily/react';
import React from 'react';
import { InstanceContext } from '@rxdrag/plugin-sdk/contexts/instance';
import { useProTableParams } from '@rxdrag/plugin-sdk/contexts/propTable';

export interface ICellRootProps {
  instance?: any,
  children?: React.ReactNode,
}

export const CellRoot = (
  props: ICellRootProps
) => {
  const { instance, children } = props;
  const { dataBind } = useProTableParams()
  const field = useField();

  return (
    <InstanceContext.Provider
      value={{
        field: field as Field,
        instance,
        entityName: dataBind?.entityName,
      }}
    >
      {children}
    </InstanceContext.Provider>
  )
}