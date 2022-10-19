import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { FormButtonGroup, Reset, Submit } from "@formily/antd";
import { Button } from "antd";
import React, { useCallback, useMemo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import { useParentForm } from "@formily/react"
import { useProTableParams } from "@rxdrag/plugin-sdk/contexts/propTable";
import { isObjectField } from "@formily/core";
import { observer } from "@formily/reactive-react";
import { useTableSearch } from "~/shared/action/hooks/useTableSearch";

export const ButtonsGridColum = observer((
  props: {
    layout?: "horizontal" | "vertical",
    expanded?: boolean,
    collapsiable?: boolean,
    onToggle: () => void,
  }
) => {
  const { layout, expanded, collapsiable, onToggle } = props;
  const { t } = useLocalTranslations();
  const params = useProTableParams();
  const form = useParentForm();
  const objectField = useMemo(() => isObjectField(form) && form, [form]);

  const submit = useTableSearch();
  const handleReset = useCallback(() => {
    params && objectField?.reset();
  }, [objectField, params])

  const handleSubmit = useCallback(() => {
    submit()
  }, [submit])

  const acions = useMemo(() => {
    return (
      <>
        <Submit onSubmit={handleSubmit}>{t("Search")}</Submit>
        <Reset onClick={handleReset} >{t("Reset")}</Reset>
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
                {!expanded ? t("PackUp") : t("Expand")}
                {!expanded ? <UpOutlined /> : <DownOutlined />}
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