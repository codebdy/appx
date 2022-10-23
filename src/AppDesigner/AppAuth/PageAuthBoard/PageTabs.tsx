import { Tabs } from "antd"
import React, { useMemo } from "react"
import { memo } from "react"
import { IComponentAuthConfig, IMenuAuthConfig, IPage, IPageCategory } from "~/model";
import { useDevices } from "~/hooks/useDevices";
import { PageAuthPanal } from "./PageAuthPanal";
import { ID } from "~/shared";

export const PageTabs = memo((
  props: {
    categories: IPageCategory[],
    pages: IPage[],
    compoentConfigs: IComponentAuthConfig[],
    roleId: ID,
  }
) => {
  const { pages, categories, compoentConfigs, roleId } = props;
  const devices = useDevices();
  const items = useMemo(() => {
    return devices.map(device => {
      return {
        key: device.key,
        label: device.name,
        children: <PageAuthPanal
          device={device}
          categories={categories.filter(category => category.device === device.key)}
          pages={pages.filter(page => page.device === device.key)}
          roleId={roleId}
          componentConfigs={compoentConfigs.filter(item => item.roleId === roleId && item.device === device.key)}
        />
      }
    })
  }, [devices, pages, compoentConfigs, roleId])

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
    />
  )
})