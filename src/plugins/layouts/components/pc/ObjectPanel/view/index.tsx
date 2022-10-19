import { observer } from "@formily/reactive-react"
import { IDataBindSource } from "~/datasource"
import React, { useEffect, useMemo } from "react"
import { isObj } from "@formily/shared";
import {
  useFieldSchema,
  useField
} from '@formily/react'
import { useQueryParams } from '~/datasource/hooks/useQueryParams';
import { useDataQuery } from '~/datasource/hooks/useDataQuery';
import { useShowError } from '~/hooks/useShowError';
import { Spin } from "antd";
import { Field, isField } from '@formily/core'
import { useExpressionScope } from '@formily/react'
import { InstanceContext } from "@rxdrag/plugin-sdk/contexts/instance";

const Component = observer((props: {
  dataBind: IDataBindSource,
  children?: React.ReactNode,
  value?: any,
  onChange?: (value: any) => void //这个必须要过滤出来
}) => {
  const { dataBind, children } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBind, schema);
  const field = useField();
  const expScope = useExpressionScope()

  const { data, loading, error } = useDataQuery(expScope?.$params?.dataId ? queryParams : undefined);
  useShowError(error);

  if (data && !isObj(data)) {
    throw new Error("Data is not object, please check query expression")
  }

  useEffect(() => {
    if (isField(field)) {
      field.setInitialValue(data);
    }

  }, [data, field])

  const contextValue = useMemo(() => {
    return {
      field: field as Field,
      instance: data,
      entityName: dataBind?.entityName,
    }
  }, [data, dataBind?.entityName, field])
  return (
    loading
      ?
      <Spin spinning={loading}>
        {children}
      </Spin>
      :
      <>
        <InstanceContext.Provider
          value={contextValue}
        >
          {children}
        </InstanceContext.Provider>
      </>
  )
})

export default Component;
