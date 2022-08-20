import { Card, TableProps } from "antd"
import React, { useCallback, useRef, useState } from "react"
import { IProTableParams, ProTableContext } from "./context"
import "./index.less"
import locales, { LOCALES_NS } from "./locales"
import { QueryFormExample } from "./QueryForm"
import QueryTable from "./QueryTable"
import TableToolbar from "./TableToolbar"
import SelectMessage from "./SelectMessage"
import { observer } from "@formily/reactive-react"
import { ArrayBase } from "@formily/antd"
import {
  useField,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { GeneralField, FieldDisplayTypes, ArrayField } from '@formily/core'
import { ColumnProps } from "antd/lib/table"
import { Schema } from '@formily/json-schema'
import { usePrefixCls } from "@formily/antd/esm/__builtins__"
import { isArr } from '@formily/shared'
import { registerResourceBundle } from "../../../../i18n/registerResourceBundle"
import { IDataSourceableProps } from "../../../common/IDataSourceableProps"

registerResourceBundle(LOCALES_NS, locales);
interface ObservableColumnSource {
  field: GeneralField
  columnProps: ColumnProps<any>
  schema: Schema
  display: FieldDisplayTypes
  name: string
}

const isColumnComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Column') > -1
}

const isOperationsComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Operations') > -1
}

const isAdditionComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Addition') > -1
}

const useArrayTableColumns = (
  dataSource: any[],
  sources: ObservableColumnSource[]
): TableProps<any>['columns'] => {
  return sources?.reduce((buf, { name, columnProps, schema, display }, key) => {
    if (display !== 'visible') return buf
    if (!isColumnComponent(schema)) return buf
    return buf.concat({
      ...columnProps,
      key,
      dataIndex: name,
      render: (value: any, record: any) => {
        const index = dataSource.indexOf(record)
        const children = (
          <ArrayBase.Item index={index} record={() => dataSource[index]}>
            <RecursionField schema={schema} name={index} onlyRenderProperties />
          </ArrayBase.Item>
        )
        return children
      },
    })
  }, [])
}

const useArrayTableSources = () => {
  const arrayField = useField()
  const schema = useFieldSchema()
  const parseSources = (schema: Schema): ObservableColumnSource[] => {
    if (
      isColumnComponent(schema) ||
      isOperationsComponent(schema) ||
      isAdditionComponent(schema)
    ) {
      if (!schema['x-component-props']?.['dataIndex'] && !schema['name'])
        return []
      const name = schema['x-component-props']?.['dataIndex'] || schema['name']
      const field = arrayField.query(arrayField.address.concat(name)).take()
      const columnProps =
        field?.component?.[1] || schema['x-component-props'] || {}
      const display = field?.display || schema['x-display']
      return [
        {
          name,
          display,
          field,
          schema,
          columnProps,
        },
      ]
    } else if (schema.properties) {
      return schema.reduceProperties((buf, schema) => {
        return buf.concat(parseSources(schema))
      }, [])
    }
  }

  const parseArrayItems = (schema: Schema['items']) => {
    if (!schema) return []
    const sources: ObservableColumnSource[] = []
    const items = isArr(schema) ? schema : [schema]
    return items.reduce((columns, schema) => {
      const item = parseSources(schema)
      if (item) {
        return columns.concat(item)
      }
      return columns
    }, sources)
  }

  if (!schema) throw new Error('can not found schema object')

  return parseArrayItems(schema.items)
}

export interface IProTableProps extends IDataSourceableProps{
  className?: string,
  hasQueryForm?: boolean,
  hasToolbar?: boolean,
}

export const ProTable = observer((
  props: IProTableProps
) => {
  const [params, setParams] = useState<IProTableParams>();
  const ref = useRef<HTMLDivElement>()
  const field = useField<ArrayField>()
  const prefixCls = usePrefixCls('appx-pro-table')
  const dataSource = Array.isArray(field.value) ? field.value.slice() : []
  const sources = useArrayTableSources()
  const columns = useArrayTableColumns(dataSource, sources)

  const handleSelectedChange = useCallback((keys?: React.Key[]) => {
    setParams(params => ({ ...params, selectedRowKeys: keys }))
  }, [])

  return (
    <ProTableContext.Provider
      value={{
        ...params,
        onSelectedChange: handleSelectedChange
      }}
    >
      <div className="appx-pro-table">
        <Card>
          <QueryFormExample />
        </Card>
        <Card style={{ marginTop: "16px" }}>
          <TableToolbar />
          <SelectMessage />
          <QueryTable />
        </Card>
      </div>
    </ProTableContext.Provider>
  )
})
