import React, { memo, useCallback, useMemo } from "react"
import * as ICONS from '@ant-design/icons'
import { createForm } from "@formily/core";
import { createSchemaField } from '@formily/react'
import { useChangePassword } from "../../../../../enthooks/hooks/useChangePassword";
import { Form, FormButtonGroup, FormItem, Password, Submit } from "@formily/antd";
import { useShowError } from "../../../../../hooks/useShowError";
import { message } from "antd";
import { useSetToken } from "../../../../../enthooks";
import { DESIGNER_TOKEN_NAME } from "../../../../../consts";
import { useTranslation } from "react-i18next";

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



const ChangePasswordForm = memo((
  props: {
    onClose: () => void,
    loginName: string,
  }
) => {
  const { loginName, onClose } = props;
  const setToken = useSetToken();
  const { t } = useTranslation();
  const [change, { error, loading }] = useChangePassword({
    onCompleted: (token?: string) => {
      if (token) {
        message.success(t("OperateSuccess"))
        setToken(token);
        if (localStorage.getItem(DESIGNER_TOKEN_NAME)) {
          localStorage.setItem(DESIGNER_TOKEN_NAME, token)
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
  const confirmMessage = useMemo(() => t("PasswordDisaccord"), [t]);
  const schema = useMemo(() => ({
    type: 'object',
    properties: {
      oldPassword: {
        type: 'string',
        title: t("OldPassword"),
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Password',
        'x-component-props': {
          prefix: "{{icon('LockOutlined')}}",
        },
      },
      newPassword: {
        type: 'string',
        title: t("NewPassword"),
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
        title: t("ConfirmPassword"),
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
  }), [confirmMessage, t])

  return (
    <Form
      form={form}
      labelCol={6}
      wrapperCol={16}
      size="large"
      onAutoSubmit={handleSubmit}
    >
      <SchemaField schema={schema} />
      <FormButtonGroup.FormItem>
        <Submit block size="large" loading={loading}>
          {t("ConfirmChange")}
        </Submit>
      </FormButtonGroup.FormItem>
    </Form>
  )
})

export default ChangePasswordForm