import { FormOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

const DataSourceInput = memo((
  props: {

  }
) => {
  const {t} = useTranslation();
  return (
    <>
      <Button
        block
      >
        {t("SettingsForm.ConfigDataSource")}
      </Button>
    </>
  )
})

export default DataSourceInput;