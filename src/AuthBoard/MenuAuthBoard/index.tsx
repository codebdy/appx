import React, { useCallback, useState } from "react"
import { memo } from "react"
import { ID } from "../../shared"
import { ListConentLayout } from "../../common/ListConentLayout"
import { RoleList } from "../RoleList"
import { useParseLangMessage } from "../../plugin-sdk"
import { useTranslation } from "react-i18next"
import { Breadcrumb } from "antd"
import { useRole } from "../hooks/useRole"

export const MenuAuthBoard = memo(() => {
  const [selectedRoleId, setSelectedRoleId] = useState<ID>();
  const p = useParseLangMessage();
  const { t } = useTranslation();
  const selectedRole = useRole(selectedRoleId);
  
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
        <Breadcrumb className ="bottom-border auth-breadcrumb">
          <Breadcrumb.Item>{t("Auth.MenuAuth")}</Breadcrumb.Item>
          <Breadcrumb.Item>{p(selectedRole?.name)}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ flex: 1, overflow: "auto" }}>

        </div>
    </ListConentLayout>
  )
})