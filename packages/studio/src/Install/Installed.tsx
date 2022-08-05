import { Button } from "antd"
import React, { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN_URL } from "../consts"
import { getLocalMessage } from "../locales/getLocalMessage"

const Installed = memo(() => {
  const navigate = useNavigate()
  const handleLogin = useCallback(() => {
    navigate(LOGIN_URL)
  }, [navigate])
  return (
    <div style={{
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
    }}>
      <div style={{ marginTop: "-16px" }}>
        {t("install.InstalledMessage")}
      </div>
      <div style={{ marginTop: "16px" }}>
        <Button type="primary" onClick={handleLogin}>
          {t("Login")}
        </Button>
      </div>
    </div>
  )
})

export default Installed