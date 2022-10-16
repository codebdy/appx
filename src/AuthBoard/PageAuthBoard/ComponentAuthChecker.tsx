import { Checkbox } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IComponentAuthConfig } from "../../model"
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUpsertMenuAuthConfig } from "../hooks/useUpsertMenuAuthConfig";
import { Device } from "@rxdrag/appx-plugin-sdk";

export const ComponentAuthChecker = memo((
  props: {
    componentAuthConfig?: IComponentAuthConfig,
    roleId: ID,
    componentId: string,
    device: Device,
  }
) => {
  const { componentAuthConfig, roleId, componentId, device } = props;
  const [checked, setChecked] = useState(false);
  const [upsertMenuConfig, { error, loading }] = useUpsertMenuAuthConfig();
  useShowError(error)

  useEffect(() => {
    setChecked(!componentAuthConfig?.refused)
  }, [componentAuthConfig])

  const handleChange = useCallback((e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    upsertMenuConfig(
      {
        ...componentAuthConfig,
        roleId,
        menuItemUuid: componentId,
        device,
        refused: !e.target.checked,
      }
    )
  }, [upsertMenuConfig, roleId, componentId, device])

  return (
    <>
      {
        loading
          ? <LoadingOutlined />
          : <Checkbox
            checked={checked}
            onChange={handleChange}
          />
      }
    </>
  )
})