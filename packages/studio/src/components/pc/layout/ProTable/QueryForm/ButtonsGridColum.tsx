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
        <Reset >{t("Reset")}</Reset>
        <Submit onSubmit={console.log}>{t("Search")}</Submit>
      </>
    )
  }, [t])

  return (
    <FormGrid.GridColumn
      gridSpan={expanded ? -1 : 1}
      style={{
        display: 'flex',
        justifyContent: 'right',
        alignItems: layout === "horizontal" ? "flex-start" : "center",
      }}
    >
      {
        collapsiable
          ?
          <>
            <FormButtonGroup align="right">{acions}</FormButtonGroup>
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
          </>
          :
          <FormButtonGroup align="right">{acions}</FormButtonGroup>
      }
    </FormGrid.GridColumn>
  )
})