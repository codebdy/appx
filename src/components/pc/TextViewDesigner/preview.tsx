import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"

export const TextViewDesigner = memo((props) => {
  const { t } = useTranslation()
  return (
    <div {...props}>
      {
        t("Designer.TextView")
      }
    </div>
  )
})