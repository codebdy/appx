import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDevices } from "../hooks/useDevices";

export const TemplateDesigner = memo(() => {
  const { t } = useTranslation();
  const devices = useDevices();
  const navigate = useNavigate();
  
  return (
    <div>
      左侧树组织模板分类
    </div>
  )
})