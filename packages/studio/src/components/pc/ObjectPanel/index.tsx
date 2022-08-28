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
import { Field } from '@formily/core'
import { InstanceContext } from "../../../shared/contexts/instance";

export const ObjectPanel = observer((props: {
  dataBindSource: IDataBindSource,
  children?: React.ReactNode,
}) => {
  const { dataBindSource, children } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBindSource, schema);
  const field = useField();
  const { data, loading, error } = useDataQuery(queryParams);
  useShowError(error);

  if (data && !isObj(data)) {
    throw new Error("Data is not object, please check query expression")
  }

  useEffect(() => {
    (field as Field).setInitialValue(data);
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
            fieldPath: field?.path?.toString(),
            instance: data,
            entityName: dataBindSource.entityName,
          }}
        >
          {children}
        </InstanceContext.Provider>
      </>
  )
})

