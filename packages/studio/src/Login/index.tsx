import React, { useCallback, useRef } from "react"
import { useMemo } from "react"
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/react'
import { Checkbox, Form, FormItem, Input, Password, Submit } from '@formily/antd'
import { Card, message } from 'antd'
import * as ICONS from '@ant-design/icons'
import { TOKEN_NAME } from "@appx/shared"
import { getLocalMessage } from "../locales/getLocalMessage"
import { observer } from "@formily/reactive-react"
import { useLogin } from "../enthooks"

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    Password,
    Checkbox
  },
  scope: {
    icon(name: string | number) {
      return React.createElement(ICONS[name])
    },
  },
})

const schema = () => ({
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: getLocalMessage("UserName"),
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        prefix: "{{icon('UserOutlined')}}",
      },
    },
    password: {
      type: 'string',
      title: getLocalMessage("Password"),
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
    rememberMe: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox',
      "x-component-props": {
        children: getLocalMessage("RememberMe"),
      }
    }
  },
})

const Login = observer(() => {
  const rememberMeRef = useRef(true);

  const form = useMemo(
    () =>
      createForm({
        values: {
          username: "admin",
          password: "123456",
          rememberMe: true,
        },
      }),
    []
  )
  form.submit()

  const [login, { loading }] = useLogin({
    onCompleted(atoken: string) {
      if (atoken) {
        if (rememberMeRef.current) {
          localStorage.setItem(TOKEN_NAME, atoken);
        } else {
          localStorage.removeItem(TOKEN_NAME);
        }
        //history.push(INDEX_URL);
      }
    },
    onError(error: any) {
      message.error(error.message)
      // if (error?.response?.status === 401) {
      //   //setErroMessage(intl.get("login-failure"));
      // } else {
      //   //setErroMessage(error?.message);
      // }
    },
  });

  const handleLogin = useCallback((values: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) => {
    rememberMeRef.current = values.rememberMe;
    login(values.username, values.password)
  }, [login]);

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
        <h3>{getLocalMessage("Login")}</h3>
          <Form
            form={form}
            layout="vertical"
            size="large"
            onAutoSubmit={handleLogin}
          >
            <SchemaField schema={schema()} />
            <Submit block size="large" loading={loading}>
              {getLocalMessage("Login")}
            </Submit>
          </Form>
      </Card>
    </div>
  )
})

export default Login;