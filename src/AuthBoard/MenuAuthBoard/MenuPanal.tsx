import React from "react"
import { memo } from "react"
import { IMenu } from "../../model";
import { IDevice } from "../../hooks/useDevices"

export const MenuPanal = memo((
  props: {
    device: IDevice,
    menu: IMenu,
  }
) => {
  const { device, menu } = props;
  console.log("哈哈", menu)
  return (
    <>
      {device.name}
    </>
  )
})