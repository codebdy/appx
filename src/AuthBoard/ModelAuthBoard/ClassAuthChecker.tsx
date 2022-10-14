import { Button, Checkbox } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IClassAuthConfig } from "../../model"
import { useUpsertClassAuthConfig } from "../hooks/useUpsertClassAuthConfig";
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { FunctionOutlined, LoadingOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ExpressionModal } from "./ExpressionModal";

export const ClassAuthChecker = memo((
  props: {
    classUuid: string,
    classConfig?: IClassAuthConfig,
    roleId: ID,
    field: string,
    expressionField: string,
  }
) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { classUuid, classConfig, roleId, field } = props;
  const [postClassConfig, { error, loading }] = useUpsertClassAuthConfig();
  useShowError(error)

  useEffect(() => {
    setChecked(classConfig?.[field])
  }, [classConfig, field])

  const handleChange = useCallback((e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    postClassConfig(
      {
        ...classConfig,
        classUuid,
        roleId,
        [field]: e.target.checked,
      }
    )
  }, [postClassConfig, roleId])

  const handleOpenExpressionDialog = useCallback(() => {
    setOpen(true);
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, [])


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
      {
        classConfig?.[field] &&
        <>
          <Button
            type="text"
            shape="circle"
            icon={<FunctionOutlined />}
            onClick={handleOpenExpressionDialog}
          />
          {
            open && <ExpressionModal open={open} onOpenChange={handleOpenChange} />
          }
        </>
      }

    </>
  )
})