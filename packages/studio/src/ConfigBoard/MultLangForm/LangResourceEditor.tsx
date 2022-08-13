import { FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const LangResourceEditor = memo(() => {
  const { t } = useTranslation();
  return (
    <>
      <Button icon={<FormOutlined />}>
        {t("Edit")}
      </Button>
    </>
  )
})

export default LangResourceEditor;