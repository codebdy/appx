import { Collapse } from "antd";
import React, { memo } from "react"
import { useTranslation } from "react-i18next";
const { Panel } = Collapse;

export const Devices = memo(() => {
  const {t} = useTranslation();
  return (
    
      <p>Devices</p>
  )
})