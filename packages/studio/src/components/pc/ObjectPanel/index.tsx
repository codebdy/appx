import { observer } from "@formily/reactive-react"
import { IDataBindSource } from "../../../datasource"
import React from "react"
import { isObj } from "@formily/shared";
import {
  useFieldSchema,
} from '@formily/react'
import { useQueryParams } from '../../../datasource/hooks/useQueryParams';
import { useDataQuery } from '../../../datasource/hooks/useDataQuery';
import { useShowError } from '../../../hooks/useShowError';
import { Spin } from "antd";

export const ObjectPanel = observer((props: {
  dataBindSource: IDataBindSource,
  children?: React.ReactNode,
}) => {
  const { dataBindSource, children } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBindSource, schema);

  const { data, loading, error } = useDataQuery(queryParams);
  useShowError(error);

  if (data && !isObj(data)) {
    throw new Error("Data is not object, please check query expression")
  }

  return (
    loading
      ?
      <Spin spinning={loading}>
        {children}
      </Spin>
      :
      <>
        {children}
      </>
  )
})

