import { Button, Checkbox } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { IPropertyAuthConfig } from "../../model"
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { FunctionOutlined, LoadingOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ExpressionModal } from "./ExpressionModal";
import { useUpsertPropertyAuthConfig } from "../hooks/useUpsertPropertyAuthConfig";

export const PropertyAuthChecker = memo((
  props: {
    propertyUuid: string,
    propertyConfig?: IPropertyAuthConfig,
    roleId: ID,
    field: string,
    expressionField: string,
  }
) => {
  const { propertyUuid, propertyConfig, roleId, field, expressionField } = props;
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [upsert, { error, loading }] = useUpsertPropertyAuthConfig({
    onCompleted: () => {
      setOpen(false);
    }
  });
  useShowError(error)

  useEffect(() => {
    setChecked(propertyConfig?.[field])
  }, [propertyConfig, field])

  const handleChange = useCallback((e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
    upsert(
      {
        ...propertyConfig,
        propertyUuid: propertyUuid,
        roleId,
        [field]: e.target.checked,
      }
    )
  }, [upsert, field, roleId])

  const handleOpenExpressionDialog = useCallback(() => {
    setOpen(true);
  }, [])

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open);
  }, [])

  const handleExrpessionChange = useCallback((expression: string) => {
    upsert(
      {
        ...propertyConfig,
        propertyUuid: propertyUuid,
        roleId,
        [expressionField]: expression,
      }
    )
  }, [upsert, roleId, expressionField])

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
        propertyConfig?.[field] &&
        <>
          <Button
            type="text"
            shape="circle"
            icon={<FunctionOutlined />}
            onClick={handleOpenExpressionDialog}
          />
          {
            open &&
            <ExpressionModal
              value={propertyConfig?.[expressionField]}
              open={open}
              onOpenChange={handleOpenChange}
              saving={loading}
              onChange={handleExrpessionChange}
            />
          }
        </>
      }

    </>
  )
})