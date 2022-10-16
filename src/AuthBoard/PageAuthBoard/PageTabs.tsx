import { Tabs } from "antd"
import React, { useMemo } from "react"
import { memo } from "react"
import { IMenu, IMenuAuthConfig } from "../../model";
import { useDevices } from "../../hooks/useDevices";
import { PageAuthPanal } from "./PageAuthPanal";
import { ID } from "../../shared";

export const PageTabs = memo((
  props: {
    menus: IMenu[],
    menuConfigs: IMenuAuthConfig[],
    roleId: ID,
  }
) => {
  const { menus, menuConfigs, roleId } = props;
  const devices = useDevices();

  const items = useMemo(() => {
    return devices.map(device => {
      return {
        key: device.key,
        label: device.name,
        children: <PageAuthPanal
          device={device}
          menu={menus.find(menu => menu.device === device.key)}
          roleId={roleId}
          menuConfigs={menuConfigs.filter(item => item.roleId === roleId && item.device === device.key)}
        />
      }
    })
  }, [devices, menuConfigs, roleId])

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
    />
  )
})