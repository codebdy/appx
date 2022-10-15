import { Tabs } from "antd"
import React, { useMemo } from "react"
import { memo } from "react"
import { IMenu } from "../../model";
import { useDevices } from "../../hooks/useDevices";
import { MenuPanal } from "./MenuPanal";

export const MenuTabs = memo((
  props: {
    menus: IMenu[]
  }
) => {
  const { menus } = props;
  const devices = useDevices();

  const items = useMemo(() => {
    return devices.map(device => {
      return {
        key: device.key,
        label: device.name,
        children: <MenuPanal device={device} menu={menus.find(menu => menu.device === device.key)} />
      }
    })
  }, [devices])

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
    />
  )
})