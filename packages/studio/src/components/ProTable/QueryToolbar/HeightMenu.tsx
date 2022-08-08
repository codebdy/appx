import { ColumnHeightOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import React from "react"
import { memo } from "react"
import { useLocalTranslations } from "../hooks/useLocalTranslations";

const HeightMenu = memo(() => {
  const { t } = useLocalTranslations();
  const menu = (
    <Menu
      selectedKeys={["1"]}
      style={{
        minWidth: 80,
      }}
      items={[
        {
          label: t("Default"),
          key: '0',
        },
        {
          label: t("Middle"),
          key: '1',
        },
        {
          label: t("Dense"),
          key: '3',
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Tooltip title={t("Density")}>
        <Button shape="circle" size="large" type="text" onClick={e => e.preventDefault()}>
          <ColumnHeightOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  )

})

export default HeightMenu