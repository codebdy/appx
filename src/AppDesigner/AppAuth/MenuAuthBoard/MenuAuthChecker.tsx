import { Checkbox } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IMenuAuthConfig } from "~/model"
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { ID } from "~/shared";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUpsertMenuAuthConfig } from "../hooks/useUpsertMenuAuthConfig";
import { Device } from "@rxdrag/appx-plugin-sdk";

export const MenuAuthChecker = memo((
  props: {
    menuAuthConfig?: IMenuAuthConfig,
    roleId: ID,
    menuItemUuid: string,
    device: Device,
  }
) => {
  const { menuAuthConfig, roleId, menuItemUuid, device } = props;
  const [checked, setChecked] = useState(false);
  const [upsertMenuConfig, { error, loading }] = useUpsertMenuAuthConfig();
  useShowError(error)

  useEffect(() => {
    setChecked(!menuAuthConfig?.refused)
  }, [menuAuthConfig])

  const handleChange = useCallback((e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    upsertMenuConfig(
      {
        ...menuAuthConfig,
        roleId,
        menuItemUuid,
        device,
        refused: !e.target.checked,
      }
    )
  }, [upsertMenuConfig, roleId, menuItemUuid, device])

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