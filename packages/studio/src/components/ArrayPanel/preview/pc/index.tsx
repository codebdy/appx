import React from "react"
import {
  useField,
  observer,
  useFieldSchema,
  RecursionField,
} from '@formily/react'
import { ArrayField } from "@formily/core";
import { ArrayBase } from "@formily/antd";
import { Empty } from "antd";

export interface IArrayPanelProps {
  value?: boolean,
  onChange?: (value?: boolean) => void,
}

export const ArrayPanel = observer((props: IArrayPanelProps) => {
  const field = useField<ArrayField>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []

  if (!schema) throw new Error('can not found schema object')

  const renderItems = () => {
    return dataSource?.map((item, index) => {
      const items = Array.isArray(schema.items)
        ? schema.items[index] || schema.items[0]
        : schema.items

      const content = (
        <RecursionField
          schema={items}
          name={index}
        />
      )
      return (
        <ArrayBase.Item
          key={index}
          index={index}
          record={() => dataSource[index]}
        >
          {content}
        </ArrayBase.Item>
      )
    })
  }

  const renderEmpty = () => {
    if (dataSource?.length) return
    return (
      <Empty />
    )
  }

  return (
    <ArrayBase>
      {renderEmpty()}
      {renderItems()}
    </ArrayBase>
  )
})