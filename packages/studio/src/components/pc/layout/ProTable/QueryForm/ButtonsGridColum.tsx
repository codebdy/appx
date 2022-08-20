import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FormButtonGroup, FormGrid, Reset, Submit } from "@formily/antd";
import { Button } from "antd";
import React, { memo, useMemo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";

export const ButtonsGridColum = memo((
  props: {
    layout?: "horizontal" | "vertical",
    expanded?: boolean,
    collapsiable?: boolean,
    onToggle: () => void,
  }
) => {
  const { layout, expanded, collapsiable, onToggle } = props;
  const { t } = useLocalTranslations();

  const acions = useMemo(() => {
    return (
      <>
        <Submit onSubmit={console.log}>{t("Search")}</Submit>
        <Reset >{t("Reset")}</Reset>
      </>
    )
  }, [t])

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}
    >
      {
        collapsiable
          ?
          <>
            <FormButtonGroup>
              <Button
                type="link"
                onClick={(e) => {
                  e.preventDefault()
                  onToggle && onToggle()
                }}
              >
                {expanded ? t("PackUp") : t("Expand")}
                {expanded ? <UpOutlined /> : <DownOutlined />}
              </Button>
            </FormButtonGroup>
            <FormButtonGroup align="right">{acions}</FormButtonGroup>
          </>
          :
          <FormButtonGroup align="right">{acions}</FormButtonGroup>
      }
    </div>
  )
})