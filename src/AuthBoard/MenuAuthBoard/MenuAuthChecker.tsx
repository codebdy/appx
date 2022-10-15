import { Checkbox } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IMenuAuthConfig } from "../../model"
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { LoadingOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUpsertMenuAuthConfig } from "../hooks/useUpsertMenuAuthConfig";

export const MenuAuthChecker = memo((
  props: {
    menuAuthConfig?: IMenuAuthConfig,
    roleId: ID,
  }
) => {
  const { menuAuthConfig, roleId } = props;
  const [checked, setChecked] = useState(false);
  const [postClassConfig, { error, loading }] = useUpsertMenuAuthConfig();
  useShowError(error)

  useEffect(() => {
    setChecked(!menuAuthConfig?.refused)
  }, [menuAuthConfig])

  const handleChange = useCallback((e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    postClassConfig(
      {
        ...menuAuthConfig,
        roleId,
      }
    )
  }, [postClassConfig, roleId])

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