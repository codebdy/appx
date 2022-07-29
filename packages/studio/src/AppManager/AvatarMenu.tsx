import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Form, FormItem, Password } from "@formily/antd";
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

const schema = () => ({
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string',
      title: getLocalMessage("Password"),
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        prefix: "{{icon('LockOutlined')}}",
      },
    },
    newPassword: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.confirm_password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
    confirmPassword: {
      type: 'string',
      title: '确认密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
  },
})

const AvatarMenu = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setToken = useSetToken();
  const { me, loading, error } = useMe()
  const navigate = useNavigate();
  useShowError(error);
  const [logout] = useLogout()

  const handleLogout = useCallback(() => {
    setToken(undefined);
    localStorage.removeItem(TOKEN_NAME);
    navigate(LOGIN_URL)
    logout();
  }, [logout, navigate, setToken])

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const form = useMemo(
    () =>
      createForm({
        values: {},
      }),
    []
  )

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
        okText={getLocalMessage("Confirm")}
        cancelText={getLocalMessage("Cancel")}
        width={460}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={6}
          wrapperCol={16}
          size="large"
        //onAutoSubmit={handleLogin}
        >
          <SchemaField schema={schema()} />
        </Form>
      </Modal>
    </>
  )
})

export default AvatarMenu
