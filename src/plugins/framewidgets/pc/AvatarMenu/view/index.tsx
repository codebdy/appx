import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, Modal } from "antd"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../../../../plugin-sdk/contexts/login";
import { LOGIN_URL, TOKEN_NAME } from "../../../../../consts";
import { useLogout, useSetToken } from "../../../../../enthooks";
import ChangePasswordForm from "./ChangePasswordForm";
import "./style.less"

export interface IComponentProps {
  trigger?: ("click" | "hover" | "contextMenu")[]
}

const AvatarMenu = memo((props: IComponentProps) => {
  const { trigger, ...other } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setToken = useSetToken();
  const me = useMe()
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        {t("ChangePassword")}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {t("Logout")}
      </Menu.Item>
    </Menu>
  ), [handleLogout, showModal, t]);

  return (
    <>
      <Dropdown overlay={menu} placement="bottomRight" arrow trigger={trigger || ['click']}>
        <Avatar className="appx-avatar-menu" icon={!me && <UserOutlined />} {...other}>
          {me?.name?.substring(0, 1)?.toUpperCase()}
        </Avatar>
      </Dropdown>
      <Modal
        title={t("ChangePassword")}
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
