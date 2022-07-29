import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, Modal, Skeleton } from "antd"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, TOKEN_NAME } from "../../consts";
import { useLogout, useSetToken } from "../../enthooks";
import { useMe } from "../../enthooks/hooks/useMe";
import { useShowError } from "../../hooks/useShowError";
import { getLocalMessage } from "../../locales/getLocalMessage";
import ChangePasswordForm from "./ChangePasswordForm";

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
      <Dropdown overlay={menu} placement="bottomRight" arrow trigger={['click']}>
        {
          loading
            ?
            <Avatar><Skeleton.Avatar active={true} /></Avatar>
            : (<Avatar className="avatar" icon={!me && <UserOutlined />} >{me?.name?.substring(0, 1)?.toUpperCase()}</Avatar>)
        }

      </Dropdown>
      <Modal
        title={getLocalMessage("ChangePassword")}
        visible={isModalVisible}
        footer={null}
        width={460}
        onCancel={handleCancel}
      >
        {me?.loginName && <ChangePasswordForm onClose={handleCancel} loginName={me.loginName} />}
      </Modal>
    </>
  )
})

export default AvatarMenu
