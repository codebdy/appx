import { observer } from "@formily/reactive-react"
import React from "react"
import { IDataSourceableProps } from "../../common/IDataSourceableProps"
import { Select as FormilySelect } from "@formily/antd";

export const Select = observer((props: IDataSourceableProps & {
  labelField?: string,
  valueField?: string,
}) => {
  const { dataBind, labelField = "name", valueField = "id", ...other } = props;
  return (
    <FormilySelect
      {...other}
      fieldNames={{
        label: labelField,
        value: valueField
      }}
    />
  )
})