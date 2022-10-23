import { Switch } from "antd"
import React, { useCallback } from "react"
import { memo } from "react"
import { IClassAuthConfig } from "~/model"
import { useUpsertClassAuthConfig } from "../hooks/useUpsertClassAuthConfig";
import { useShowError } from "~/hooks/useShowError";
import { ID } from "~/shared";

export const ExpandSwitch = memo((
  props: {
    classUuid: string,
    classConfig?: IClassAuthConfig,
    roleId: ID,
  }
) => {
  const { classUuid, classConfig, roleId } = props;
  const [postClassConfig, { error, loading }] = useUpsertClassAuthConfig();
  useShowError(error)

  const handleChange = useCallback((checked: boolean) => {
    postClassConfig(
      {
        ...classConfig,
        classUuid,
        roleId,
        expanded: checked,
      }
    )
  }, [postClassConfig, roleId])

  return (
    <Switch
      size="small"
      loading={loading}
      checked={classConfig?.expanded}
      onChange={handleChange}
    />
  )
})