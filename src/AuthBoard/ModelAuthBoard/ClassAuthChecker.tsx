import { Button, Checkbox, Switch } from "antd"
import React, { useCallback } from "react"
import { memo } from "react"
import { IClassAuthConfig } from "../../model"
import { useUpsertClassAuthConfig } from "../hooks/useUpsertClassAuthConfig";
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { FunctionOutlined } from "@ant-design/icons";

export const ClassAuthChecker = memo((
  props: {
    classUuid: string,
    classConfig?: IClassAuthConfig,
    roleId: ID,
    field: string,
    expressionField: string,
  }
) => {
  const { classUuid, classConfig, roleId, field } = props;
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
    <>
      <Checkbox
        //loading={loading}
        checked={classConfig?.[field]}
      //onChange={handleChange}
      />
      <Button type="text" shape="circle" icon={<FunctionOutlined />} />
    </>
  )
})