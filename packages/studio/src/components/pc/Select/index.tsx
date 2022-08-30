import { observer } from "@formily/reactive-react"
import React from "react"
import { IDataSourceableProps } from "../../common/IDataSourceableProps"
import { Select as FormilySelect } from "@formily/antd";
import { useDataQuery } from "../../../datasource";
import { useFieldSchema } from '@formily/react'
import { useQueryParams } from "../../../datasource/hooks/useQueryParams";
import { useShowError } from "../../../hooks/useShowError";

export const Select = observer((props: IDataSourceableProps & {
  labelField?: string,
  valueField?: string,
}) => {
  const { dataBind, labelField, valueField, ...other } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBind, schema);

  const { data, loading, error } = useDataQuery(queryParams?.variables?.id ? queryParams : undefined);
  useShowError(error);

  console.log("哈哈哈", data, queryParams)

  return (
    <FormilySelect
      {...other}
      fieldNames={{
        label: labelField,
        value: valueField
      }}
      loading={loading}
      options={data}
    />
  )
})