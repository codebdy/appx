import React, { useCallback, useState } from "react"
import { memo } from "react"
import { ListConentLayout } from "../../common/ListConentLayout"
import { ModelTable } from "./ModelTable"
import { RoleList } from "../RoleList"
import "./style.less"
import { Breadcrumb } from "antd"
import { useParseLangMessage } from "../../plugin-sdk"
import { useTranslation } from "react-i18next"
import { ID } from "../../shared"
import { useRole } from "../hooks/useRole"

export const ModelAuthBoard = memo(() => {
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
      <Breadcrumb style={{ padding: "8px 16px" }}>
        <Breadcrumb.Item>{t("Auth.ModelAuth")}</Breadcrumb.Item>
        <Breadcrumb.Item>{p(selectedRole?.name)}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ flex: 1, overflow: "auto" }}>
        <ModelTable />
      </div>
    </ListConentLayout>
  )
})