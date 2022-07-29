import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Form, FormButtonGroup, FormItem, Password, Submit } from "@formily/antd";
import { Avatar, Dropdown, Menu, Modal, Skeleton } from "antd"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, TOKEN_NAME } from "../consts";
import { useLogout, useSetToken } from "../enthooks";
import { useMe } from "../enthooks/hooks/useMe";
import { useShowError } from "../hooks/useShowError";
import { getLocalMessage } from "../locales/getLocalMessage";
import * as ICONS from '@ant-design/icons'
import { createForm } from "@formily/core";
import { createSchemaField } from '@formily/react'

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

const AvatarMenu = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setToken = useSetToken();
  const { me, loading, error } = useMe()
  const navigate = useNavigate();
  useShowError(error);
  const [logout] = useLogout()


  const form = useMemo(
    () =>
      createForm({
        values: {},
      }),
    []
  )

  const handleLogout = useCallback(() => {
    setToken(undefined);
    localStorage.removeItem(TOKEN_NAME);
    navigate(LOGIN_URL)
    logout();
  }, [logout, navigate, setToken])

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);


  const menu = useMemo(() => (
    <Menu>
      <Menu.Item key="changepPassword"
        icon={<LockOutlined />}
        onClick={showModal}
      >
        {getLocalMessage("ChangePassword")}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {getLocalMessage("Logout")}
      </Menu.Item>
    </Menu>
  ), [handleLogout, showModal]);

  return (
    <>
      <Dropdown overlay={menu} disabled={!!error} placement="bottomRight" arrow trigger={['click']}>
        {
          loading
            ?
            <Avatar><Skeleton.Avatar active={true} /></Avatar>
            : ((!error) ? <Avatar className="avatar" icon={!me && <UserOutlined />} >{me?.name?.substring(0, 1)?.toUpperCase()}</Avatar> : <div></div>)
        }

      </Dropdown>
      <Modal
        title={getLocalMessage("ChangePassword")}
        visible={isModalVisible}
        footer={null}
        width={460}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={6}
          wrapperCol={16}
          size="large"
        >
          <SchemaField schema={schema()} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              {getLocalMessage("ConfirmChange")}
            </Submit>
          </FormButtonGroup.FormItem>
        </Form>
      </Modal>
    </>
  )
})

export default AvatarMenu
