import { observer } from "@formily/reactive-react"
import { IDataBindSource } from "../../../datasource"
import React, { useEffect } from "react"
import { isObj } from "@formily/shared";
import {
  useFieldSchema,
  useField
} from '@formily/react'
import { useQueryParams } from '../../../datasource/hooks/useQueryParams';
import { useDataQuery } from '../../../datasource/hooks/useDataQuery';
import { useShowError } from '../../../hooks/useShowError';
import { Spin } from "antd";
import { Field, isField } from '@formily/core'
import { InstanceContext } from "../../../shared/contexts/instance";

export const ObjectPanel = observer((props: {
  dataBind: IDataBindSource,
  children?: React.ReactNode,
}) => {
  const { dataBind, children } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBind, schema);
  const field = useField();

  const { data, loading, error } = useDataQuery(queryParams?.variables?.id ? queryParams : undefined);
  useShowError(error);

  if (data && !isObj(data)) {
    throw new Error("Data is not object, please check query expression")
  }

  useEffect(() => {
    if (isField(field)) {
      field.setInitialValue(data);
    }

  }, [data, field])

  return (
    loading
      ?
      <Spin spinning={loading}>
        {children}
      </Spin>
      :
      <>
        <InstanceContext.Provider
          value={{
            field: field as Field,
            instance: data,
            entityName: dataBind.entityName,
          }}
        >
          {children}
        </InstanceContext.Provider>
      </>
  )
})

