import { LockOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Dropdown, Menu, Skeleton } from "antd"
import React, { memo, useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, TOKEN_NAME } from "../consts";
import { useLogout, useSetToken } from "../enthooks";
import { useMe } from "../enthooks/hooks/useMe";
import { useShowError } from "../hooks/useShowError";
import { getLocalMessage } from "../locales/getLocalMessage";

const AvatarMenu = memo(() => {
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

  const menu = useMemo(() => (
    <Menu>
      <Menu.Item key="changepPassword"
        icon={<LockOutlined />}
      >
        {getLocalMessage("ChangePassword")}
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {getLocalMessage("Logout")}
      </Menu.Item>
    </Menu>
  ), [handleLogout]);

  return (
    <Dropdown overlay={menu} disabled={!!error || !me} placement="bottomRight" arrow trigger={['click']}>
      {
        loading
          ?
          <Avatar><Skeleton.Avatar active={true} /></Avatar>
          : ((!error && me) ? <Avatar className="avatar" icon={<UserOutlined />} /> : <div></div>)
      }

    </Dropdown>
  )
})

export default AvatarMenu