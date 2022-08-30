import { observer } from "@formily/reactive-react"
import React, { useCallback, useMemo } from "react"
import { IDataSourceableProps } from "../../common/IDataSourceableProps"
import { Select as FormilySelect } from "@formily/antd";
import { useDataQuery } from "../../../datasource";
import { useFieldSchema } from '@formily/react'
import { useQueryParams } from "../../../datasource/hooks/useQueryParams";
import { useShowError } from "../../../hooks/useShowError";
import { isArr } from "@formily/shared";

export const Select = observer((props: IDataSourceableProps & {
  labelField?: string,
  valueField?: string,
  value?: any;
  onChange?: (value?: any) => void,
}) => {
  const { dataBind, value, onChange, labelField, valueField, ...other } = props;
  const schema = useFieldSchema();
  const queryParams = useQueryParams(dataBind, schema);

  const { data, loading, error } = useDataQuery(queryParams?.gql ? queryParams : undefined);
  useShowError(error);

  const toArrayValue = useCallback((value) => {
    if (!value) {
      return [];
    }
    if (!isArr(value)) {
      return [value]
    }
  }, []);

  const decodeValue = useCallback((value: any[]) => {
    return value?.map(child => ({ [valueField]: child }))
  }, [valueField])

  const encodeValue = useCallback((value: { [key: string]: any }[]) => {
    return value?.map(child => (child?.[valueField]))
  }, [valueField])

  const eodededValue = useMemo(() => {
    return encodeValue(toArrayValue(value))
  }, [encodeValue, toArrayValue, value])

  const handleChange = useCallback((value) => {
    onChange(decodeValue(toArrayValue(value)))
  }, [decodeValue, onChange, toArrayValue])

  return (
    <FormilySelect
      {...other}
      fieldNames={{
        label: labelField,
        value: valueField
      }}
      loading={loading}
      options={data}
      value={eodededValue}
      onChange={handleChange}
    />
  )
})