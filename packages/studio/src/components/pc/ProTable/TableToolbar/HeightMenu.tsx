import { ColumnHeightOutlined } from "@ant-design/icons";
import { observer } from "@formily/reactive-react";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import { useUpdateComponentConfig } from "../../../../shared/AppRoot/hooks/useUpdateComponentConfig";
import React, { useCallback, useEffect } from "react"
import { useProTableParams } from "../context";
import { useLocalTranslations } from "../hooks/useLocalTranslations";
import { toJS } from "@formily/reactive";
import { useShowError } from "../../../../hooks/useShowError";

const HeightMenu = observer(() => {
  const { t } = useLocalTranslations();
  const params = useProTableParams();
  const [updateConfig, {error}] = useUpdateComponentConfig();

  useShowError(error);
  useEffect(()=>{
    params.size = params.tableConfig?.size
  }, [params]);

  const handleClick = useCallback((info) => {
    params.size = info?.key || undefined;
    updateConfig(params.path, {...toJS(params.tableConfig)||{}, size: params.size})
  }, [params, updateConfig])

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