import { Checkbox } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IComponentAuthConfig } from "../../model"
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { useUpsertComponentAuthConfig } from "../hooks/useUpsertComponentAuthConfig";

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
  const [upsertConfig, { error, loading }] = useUpsertComponentAuthConfig();
  useShowError(error)

  useEffect(() => {
    setChecked(!componentAuthConfig?.refused)
  }, [componentAuthConfig])

  const handleChange = useCallback((e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    upsertConfig(
      {
        ...componentAuthConfig,
        roleId,
        componentId,
        device,
        refused: !e.target.checked,
      }
    )
  }, [upsertConfig, roleId, componentId, device])

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