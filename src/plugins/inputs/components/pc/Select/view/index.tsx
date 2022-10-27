import { observer } from "@formily/reactive-react"
import React, { useCallback } from "react"
import { IDataSourceableProps } from "@rxdrag/plugin-sdk/model/IDataSourceableProps"
import { Select as FormilySelect } from "@formily/antd";
import { useDataQuery } from "~/datasource";
import { useFieldSchema } from '@formily/react'
import { QueryType, useQueryParams } from "~/datasource/hooks/useQueryParams";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { isArr } from "@formily/shared";
import { AssociationType } from "~/datasource/model/IFieldSource";

const Component = observer((props: IDataSourceableProps & {
  associationType?:AssociationType
  labelField?: string,
  valueField?: string,
  value?: any;
  onChange?: (value?: any) => void,
}) => {
  const { associationType, dataBind, value, onChange, labelField, valueField, ...other } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBind, schema, QueryType.Multiple);

  const { data, loading, error } = useDataQuery(queryParams?.gql ? queryParams : undefined);
  useShowError(error);

  const decodeValue = useCallback((value: any) => {
    if (isArr(value)) {
      return value?.map(child => ({ [valueField]: child }))
    } else if (value) {
      return { [valueField]: value }
    }
    return value;
  }, [valueField])

  const encodeValue = useCallback((value: any) => {
    if (isArr(value)) {
      return value?.map(child => (child?.[valueField]))
    } else if (value) {
      return value?.[valueField]
    }
    return value;
  }, [valueField])

  const handleChange = useCallback((value) => {
    const decodedValue = decodeValue(value);
    onChange(decodedValue)
  }, [decodeValue, onChange])

  return (
    <FormilySelect
      {...other}
      fieldNames={{
        label: labelField,
        value: valueField
      }}
      loading={loading}
      options={data?.nodes}
      value={encodeValue(value)}
      onChange={handleChange}
    />
  )
})

export default Component;