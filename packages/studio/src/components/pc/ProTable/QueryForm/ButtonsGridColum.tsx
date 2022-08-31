import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FormButtonGroup, Reset, Submit } from "@formily/antd";
import { Button } from "antd";
import React, { memo, useCallback, useMemo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import { useParentForm } from "@formily/react"
import { useProTableParams } from "../context";
import { isObjectField } from "@formily/core";

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
  const { onSetQueryForm } = useProTableParams();
  const form = useParentForm();

  const handleReset = useCallback(() => {
    onSetQueryForm && form?.reset();
  }, [form, onSetQueryForm])

  const handleSubmit = useCallback(() => {
    if (isObjectField(form)) {
      onSetQueryForm && form && onSetQueryForm(form?.value)
    }
  }, [form, onSetQueryForm])

  const acions = useMemo(() => {
    return (
      <>
        <Submit onSubmit={handleSubmit}>{t("Search")}</Submit>
        <Reset onReset={handleReset} >{t("Reset")}</Reset>
      </>
    )
  }, [handleReset, handleSubmit, t])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: "100%",
        alignItems: layout !== "vertical" && !collapsiable ? "flex-start" : "center",
      }}
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