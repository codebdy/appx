import React, { useCallback } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { ArrayTable, Form, FormGrid, FormItem, Input, Password, Submit } from '@formily/antd'
import { Card, Rate } from 'antd'
import * as ICONS from '@ant-design/icons'
import { VerifyCode } from './VerifyCode'

const form = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
    Card,
    ArrayTable,
    FormGrid,
    Rate
  },
  scope: {
    icon(name: string) {
      return React.createElement(ICONS[name])
    },
  },
})


const jsonSchema ={
  "type": "object",
  "properties": {
    "2d2o77wgk16": {
      "type": "void",
      "x-component": "FormGrid",
      "x-validator": [],
      "x-component-props": {},
      "x-designable-id": "2d2o77wgk16",
      "x-index": 0,
      "properties": {
        "8flfiim38e5": {
          "type": "void",
          "x-component": "FormGrid.GridColumn",
          "x-validator": [],
          "x-component-props": {
            "gridSpan": 8
          },
          "x-designable-id": "8flfiim38e5",
          "x-index": 0,
          "properties": {
            "r3boq6qwbbt": {
              "type": "string",
              "title": "Input",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              "x-designable-id": "r3boq6qwbbt",
              "x-index": 0
            }
          }
        },
        "qtn8a6hp1ya": {
          "type": "void",
          "x-component": "FormGrid.GridColumn",
          "x-validator": [],
          "x-component-props": {},
          "x-designable-id": "qtn8a6hp1ya",
          "x-index": 1,
          "properties": {
            "yfon23am7fe": {
              "type": "number",
              "title": "Rate",
              "x-decorator": "FormItem",
              "x-component": "Rate",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              "x-designable-id": "yfon23am7fe",
              "x-index": 0
            }
          }
        }
      }
    }
  },
  "x-designable-id": "x733yxvlcec"
}

export default () => {

  const handleSubmit = useCallback((value:any)=>{

  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        alignItems: "center",
        padding: '40px 0',
        height: '100%'
      }}
    >
        <Form
          form={form}
          layout="vertical"
          size="large"
          onAutoSubmit={handleSubmit}
        >
          <SchemaField schema={jsonSchema} />
          <Submit block size="large">
            登录
          </Submit>
        </Form>
    </div>
  )
}