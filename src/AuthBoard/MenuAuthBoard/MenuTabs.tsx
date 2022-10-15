import { Tabs } from "antd"
import React, { useMemo } from "react"
import { memo } from "react"
import { useDevices } from "../../hooks/useDevices";

export const MenuTabs = memo(() => {
  const devices = useDevices();

  const items = useMemo(() => {
    return devices.map(device => {
      return {
        key: device.key,
        label: device.name,
        children: <></>
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