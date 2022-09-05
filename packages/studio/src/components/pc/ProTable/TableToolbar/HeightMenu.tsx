import { ColumnHeightOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import React, { useCallback } from "react"
import { useProTableParams } from "../context";
import { useLocalTranslations } from "../hooks/useLocalTranslations";

const HeightMenu = observer(() => {
  const { t } = useLocalTranslations();
  const params = useProTableParams();
  const handleClick = useCallback((info) => {
    params.size = info?.key || undefined
  }, [params])

  const menu = (
    <Menu
      selectedKeys={[(params.size || "")]}
      style={{
        minWidth: 80,
      }}
      items={[
        {
          label: t("Default"),
          key: '',
        },
        {
          label: t("Middle"),
          key: 'middle',
        },
        {
          label: t("Dense"),
          key: 'small',
        },
      ]}

      onClick={handleClick}
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