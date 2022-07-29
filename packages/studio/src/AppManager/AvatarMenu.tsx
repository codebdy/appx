import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, Modal, Skeleton } from "antd"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, TOKEN_NAME } from "../consts";
import { useLogout, useSetToken } from "../enthooks";
import { useMe } from "../enthooks/hooks/useMe";
import { useShowError } from "../hooks/useShowError";
import { getLocalMessage } from "../locales/getLocalMessage";

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
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
})

export default AvatarMenu