import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FormButtonGroup, FormGrid, Reset, Submit } from "@formily/antd";
import { Button } from "antd";
import React, { memo } from "react"
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

  const renderActions = () => {
    return (
      <>
        <Submit onSubmit={console.log}>{t("Search")}</Submit>
        <Reset >{t("Reset")}</Reset>
      </>
    )
  }

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
            <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
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
          <FormButtonGroup align="right">{renderActions()}</FormButtonGroup>
      }
    </FormGrid.GridColumn>
  )
})