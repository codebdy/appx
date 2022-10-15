import React, { useCallback, useState } from "react"
import { memo } from "react"
import { ID } from "../../shared"
import { ListConentLayout } from "../../common/ListConentLayout"
import { RoleList } from "../RoleList"
import { useParseLangMessage } from "../../plugin-sdk"
import { useTranslation } from "react-i18next"
import { Breadcrumb, Tabs } from "antd"
import { useRole } from "../hooks/useRole"
import "./style.less"

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
      <Breadcrumb className="bottom-border auth-breadcrumb">
        <Breadcrumb.Item>{t("Auth.MenuAuth")}</Breadcrumb.Item>
        <Breadcrumb.Item>{p(selectedRole?.name)}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="menu-auth-content">
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `Tab 1`,
              key: '1',
              children: `Content of Tab Pane 1`,
            },
            {
              label: `Tab 2`,
              key: '2',
              children: `Content of Tab Pane 2`,
            },
            {
              label: `Tab 3`,
              key: '3',
              children: `Content of Tab Pane 3`,
            },
          ]}
        />
      </div>
    </ListConentLayout>
  )
})