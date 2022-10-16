import { Tabs } from "antd"
import React, { useMemo } from "react"
import { memo } from "react"
import { IComponentAuthConfig, IMenuAuthConfig, IPage } from "../../model";
import { useDevices } from "../../hooks/useDevices";
import { PageAuthPanal } from "./PageAuthPanal";
import { ID } from "../../shared";

export const PageTabs = memo((
  props: {
    pages: IPage[],
    compoentConfigs: IComponentAuthConfig[],
    roleId: ID,
  }
) => {
  const { pages, compoentConfigs, roleId } = props;
  const devices = useDevices();

  const items = useMemo(() => {
    return devices.map(device => {
      return {
        key: device.key,
        label: device.name,
        children: <PageAuthPanal
          device={device}
          page={pages.find(menu => menu.device === device.key)}
          roleId={roleId}
          componentConfigs={compoentConfigs.filter(item => item.roleId === roleId && item.device === device.key)}
        />
      }
    })
  }, [devices, compoentConfigs, roleId])

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
    />
  )
})