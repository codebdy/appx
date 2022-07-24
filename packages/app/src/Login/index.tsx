import React, { useCallback } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { ArrayTable, Form, FormItem, Input, Password, Submit } from '@formily/antd'
import {  Tabs, Card as AntdCard, Card } from 'antd'
import * as ICONS from '@ant-design/icons'
import { VerifyCode } from './VerifyCode'

const normalForm = createForm({
  validateFirst: true,
})

const phoneForm = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    VerifyCode,
    Card,
    ArrayTable
  },
  scope: {
    icon(name: string) {
      return React.createElement(ICONS[name])
    },
  },
})

const normalSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
}

const schema2 = {
  "type": "object",
  "properties": {
    "29z5kdb8tp7": {
      "type": "void",
      "x-component": "Card",
      "x-component-props": {
        "title": "Title"
      },
      "x-designable-id": "29z5kdb8tp7",
      "x-index": 0,
      "properties": {
        "mecz6ksi5td": {
          "type": "void",
          "x-component": "FormLayout",
          "x-component-props": {},
          "x-designable-id": "mecz6ksi5td",
          "x-index": 0,
          "properties": {
            "lpoac1f178r": {
              "type": "string",
              "title": "Input",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              "x-designable-id": "lpoac1f178r",
              "x-index": 0
            },
            "y162bzzggu5": {
              "type": "string",
              "title": "Input",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              "x-designable-id": "y162bzzggu5",
              "x-index": 1
            },
            "em5abb51skr": {
              "type": "string",
              "title": "Input",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-validator": [],
              "x-component-props": {},
              "x-decorator-props": {},
              "x-designable-id": "em5abb51skr",
              "x-index": 2
            }
          }
        }
      }
    },
    "sic32tf42d9": {
      "type": "array",
      "x-decorator": "FormItem",
      "x-component": "ArrayTable",
      "x-validator": [],
      "x-component-props": {},
      "x-decorator-props": {},
      "x-designable-id": "sic32tf42d9",
      "items": {
        "type": "object",
        "x-designable-id": "jroqhsh0vhz",
        "properties": {
          "2ohb8n4d9es": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "Title"
            },
            "x-designable-id": "2ohb8n4d9es",
            "properties": {
              "6cldsxh3545": {
                "type": "void",
                "x-component": "ArrayTable.SortHandle",
                "x-designable-id": "6cldsxh3545",
                "x-index": 0
              }
            },
            "x-index": 0
          },
          "7y8nxth0cua": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "Title"
            },
            "x-designable-id": "7y8nxth0cua",
            "properties": {
              "kqdii33zau9": {
                "type": "void",
                "x-component": "ArrayTable.Index",
                "x-designable-id": "kqdii33zau9",
                "x-index": 0
              }
            },
            "x-index": 1
          },
          "x1k1gsfxw7h": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "Title"
            },
            "x-designable-id": "x1k1gsfxw7h",
            "x-index": 2
          },
          "d9ffr8vfnaj": {
            "type": "void",
            "x-component": "ArrayTable.Column",
            "x-component-props": {
              "title": "Title"
            },
            "x-designable-id": "d9ffr8vfnaj",
            "x-index": 3
          }
        }
      },
      "x-index": 1
    }
  },
  "x-designable-id": "dqgvudiuqlx"
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
      <AntdCard style={{ width: 400, height: 360 }} title="登录">
        <Form
          form={normalForm}
          layout="vertical"
          size="large"
          onAutoSubmit={handleSubmit}
        >
          <SchemaField schema={normalSchema} />
          <Submit block size="large">
            登录
          </Submit>
        </Form>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <a href="#新用户注册">新用户注册</a>
          <a href="#忘记密码">忘记密码?</a>
        </div>
      </AntdCard>
    </div>
  )
}