import React from "react"
import { memo } from "react"
import { IDevice } from "../../hooks/useDevices"

export const MenuPanal = memo((
  props: {
    device: IDevice
  }
) => {
  const { device } = props;
  return (
    <>
      {device.name}
    </>
  )
})