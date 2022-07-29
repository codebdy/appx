import React, { memo, useCallback, useMemo } from "react"
import * as ICONS from '@ant-design/icons'
import { createForm } from "@formily/core";
import { createSchemaField } from '@formily/react'
import { useChangePassword } from "../../enthooks/hooks/useChangePassword";
import { Form, FormButtonGroup, FormItem, Password, Submit } from "@formily/antd";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { useShowError } from "../../hooks/useShowError";
import { message } from "antd";
import { useSetToken } from "../../enthooks";
import { TOKEN_NAME } from "../../consts";

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Password,
  },
  scope: {
    icon(name: string | number) {
      return React.createElement(ICONS[name])
    },
  },
})

const schema = () => {
  const confirmMessage = getLocalMessage("PasswordDisaccord");
  return ({
    type: 'object',
    properties: {
      oldPassword: {
        type: 'string',
        title: getLocalMessage("OldPassword"),
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-component-props': {
          prefix: "{{icon('LockOutlined')}}",
        },
      },
      newPassword: {
        type: 'string',
        title: getLocalMessage("NewPassword"),
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-component-props': {
          checkStrength: true,
        },
        'x-reactions': [
          {
            dependencies: ['.confirmPassword'],
            fulfill: {
              state: {
                selfErrors:
                  `{{$deps[0] && $self.value && $self.value !== $deps[0] ? "${confirmMessage}" : ""}}`,
              },
            },
          },
        ],
      },
      confirmPassword: {
        type: 'string',
        title: getLocalMessage("ConfirmPassword"),
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-component-props': {
          checkStrength: true,
        },
        'x-reactions': [
          {
            dependencies: ['.newPassword'],
            fulfill: {
              state: {
                selfErrors:
                  `{{$deps[0] && $self.value && $self.value !== $deps[0] ? "${confirmMessage}" : ""}}`,
              },
            },
          },
        ],
      },
    },
  })
}


const ChangePasswordForm = memo((
  props: {
    onClose: () => void,
    loginName: string,
  }
) => {
  const { loginName, onClose } = props;
  const setToken = useSetToken();
  const [change, { error, loading }] = useChangePassword({
    onCompleted: (token?: string) => {
      if (token) {
        message.success(getLocalMessage("OperateSuccess"))
        setToken(token);
        if (localStorage.getItem(TOKEN_NAME)) {
          localStorage.setItem(TOKEN_NAME, token)
        }
        onClose()
      }
    }
  });

  useShowError(error)

  const form = useMemo(
    () =>
      createForm({
        values: {},
      }),
    []
  )

  const handleSubmit = useCallback((values: { oldPassword: string, newPassword: string }) => {
    const { oldPassword, newPassword } = values;
    change({
      loginName,
      oldPassword,
      newPassword
    })
  }, [change, loginName])

  return (
    <Form
      form={form}
      labelCol={6}
      wrapperCol={16}
      size="large"
      onAutoSubmit={handleSubmit}
    >
      <SchemaField schema={schema()} />
      <FormButtonGroup.FormItem>
        <Submit block size="large" loading={loading}>
          {getLocalMessage("ConfirmChange")}
        </Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
})

export default ChangePasswordForm