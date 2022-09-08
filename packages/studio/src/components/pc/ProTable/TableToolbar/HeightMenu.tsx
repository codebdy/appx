import { ColumnHeightOutlined, HomeOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import { useUpdateComponentConfig } from "../../../../shared/AppRoot/hooks/useUpdateComponentConfig";
import React, { useCallback } from "react"
import { useProTableParams } from "../context";
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import { toJS } from "@formily/reactive";
import { useShowError } from "../../../../hooks/useShowError";

const HeightMenu = observer(() => {
  const { t } = useLocalTranslations();
  const params = useProTableParams();
  const [updateConfig, { error, loading }] = useUpdateComponentConfig();

  useShowError(error);

  const handleClick = useCallback((info) => {
    //params.size = info?.key || undefined;
    updateConfig(params.path, { ...toJS(params.tableConfig) || {}, size: info?.key || undefined })
  }, [params, updateConfig])

  const menu = (
    <Menu
      selectedKeys={[(params?.tableConfig?.size || "")]}
      style={{
        minWidth: 80,
      }}
      items={[
        {
          label: t("Default"),
          key: '',
          icon: <HomeOutlined/>
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
        <Button shape="circle" size="large" type="text" loading={loading} onClick={e => e.preventDefault()} icon={
          <ColumnHeightOutlined />
        }>
        </Button>
      </Tooltip>
    </Dropdown>
  )

})

export default HeightMenu