import { observer } from "@formily/reactive-react"
import React from "react"
import { IDataSourceableProps } from "../../common/IDataSourceableProps"
import {Select as FormilySelect} from "@formily/antd";

export interface ISelectProps extends IDataSourceableProps {

}

export const Select = observer((props: ISelectProps) => {
  const { dataBind, ...other } = props;
  return (
    <FormilySelect {...other} />
  )
})