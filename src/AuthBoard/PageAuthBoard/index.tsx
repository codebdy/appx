import React, { useCallback, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { ID } from "../../shared"
import { ListConentLayout } from "../../common/ListConentLayout"
import { useRoleName } from "../hooks/useRoleName"
import { RoleList } from "../RoleList"
import { Breadcrumb } from "antd"
import "./style.less"

export const PageAuthBoard = memo(() => {
  const [selectedRoleId, setSelectedRoleId] = useState<ID>();
  const { t } = useTranslation();
  const roleName = useRoleName(selectedRoleId);

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
        <Breadcrumb.Item>{t("Auth.PageAuth")}</Breadcrumb.Item>
        <Breadcrumb.Item>{roleName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="page-auth-content">
        {
          selectedRoleId &&
          <PageTabs menus={menus || []} roleId={selectedRoleId} menuConfigs={menuConfigs || []} />
        }
      </div>
    </ListConentLayout>
  )
})