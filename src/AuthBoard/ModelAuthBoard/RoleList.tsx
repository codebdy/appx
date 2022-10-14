import { UserOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import React, { useCallback, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useParseLangMessage } from "../../plugin-sdk";
import { ID } from "../../shared";
import { useRoles } from "../hooks/useRoles";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}



export const RoleList = memo(() => {
  const [selectedRoleId, setSelectedId] = useState<ID>();
  const roles = useRoles();
  const p = useParseLangMessage();
  const { t } = useTranslation();
  const handleSelect = useCallback((info) => {
    setSelectedId(info.key)
  }, [])

  const items: MenuProps['items'] = useMemo(
    () => roles.map(role => getItem(p(role.name), role.id, <UserOutlined />)),
    [roles]);

  return (
    <div className="right-border role-list">
      <div className="bottom-border roles-title">
        {t("Auth.Role List")}
      </div>
      <div className="role-list-body">
        <Menu
          mode="inline"
          items={items}
          activeKey={selectedRoleId}
          onSelect={handleSelect}
        />
      </div>

    </div>
  )
})