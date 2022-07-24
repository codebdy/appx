import React from "react"
import { memo } from "react"
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Form, FormItem, Input, Password, Submit } from '@formily/antd'
import { Card } from 'antd'
import * as ICONS from '@ant-design/icons'
import { getMessage } from "../AppDesigner/widgets"

const normalForm = createForm({
  validateFirst: true,
})

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
  },
  scope: {
    icon(name) {
      return React.createElement(ICONS[name])
    },
  },
})

const normalSchema = () => ({
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: getMessage("UserName"),
      default: "admin",
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: getMessage("Password"),
      default: "admin",
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
  },
})

const Login = memo(() => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      background: "url(/public/img/background2.jpg)",
      height: "100vh",
      backgroundPosition: " 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <Card style={{ width: 400 }}>
        <h3>{getMessage("Login")}</h3>
        <Form
          form={normalForm}
          layout="vertical"
          size="large"
          onAutoSubmit={console.log}
        >
          <SchemaField schema={normalSchema()} />
          <Submit block size="large">
            {getMessage("Login")}
          </Submit>
        </Form>
      </Card>
    </div>
  )
})

export default Login;