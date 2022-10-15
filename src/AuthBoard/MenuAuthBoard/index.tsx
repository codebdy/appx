import React, { useCallback, useState } from "react"
import { memo } from "react"
import { ID } from "../../shared"
import { ListConentLayout } from "../../common/ListConentLayout"
import { RoleList } from "../RoleList"
import { useTranslation } from "react-i18next"
import { Breadcrumb, Spin } from "antd"
import "./style.less"
import { MenuTabs } from "./MenuTabs"
import { useRoleName } from "../hooks/useRoleName"
import { useQueryAppMenus } from "../hooks/useQueryAppMenus"
import { useShowError } from "../../hooks/useShowError"

export const MenuAuthBoard = memo(() => {
  const [selectedRoleId, setSelectedRoleId] = useState<ID>();
  const { t } = useTranslation();
  const roleName = useRoleName(selectedRoleId);

  const { menus, error } = useQueryAppMenus();

  useShowError(error);

  const handleSelectRole = useCallback((selectedRoleId?: ID) => {
    setSelectedRoleId(selectedRoleId)
  }, [])


  return (
    <ListConentLayout
      listWidth={200}
      list={
        <RoleList selectedRoleId={selectedRoleId} onSelect={handleSelectRole} />
      }
    >
      <Breadcrumb className=" auth-breadcrumb">
        <Breadcrumb.Item>{t("Auth.MenuAuth")}</Breadcrumb.Item>
        <Breadcrumb.Item>{roleName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="menu-auth-content">
        {
          selectedRoleId &&
          <MenuTabs menus={menus || []} />
        }
      </div>
    </ListConentLayout>
  )
})