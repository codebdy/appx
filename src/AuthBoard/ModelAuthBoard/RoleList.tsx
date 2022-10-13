import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const RoleList = memo(() => {
  const {t} = useTranslation();
  return (
    <div className="right-border role-list">
      <div className="bottom-border roles-title">
        {t("Auth.Role List")}
      </div>
      <div className="role-list-body">

        <br /> fwe 3
        <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3
        <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3
        <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3
        <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3
        <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3      <br /> fwe 3
      </div>

    </div>
  )
})