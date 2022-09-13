import React, { useEffect, useMemo } from "react"
import { useProTableParams } from "../context"
import { useComponentConfig } from "../../../../shared/AppRoot/hooks/useComponentConfig"
import { observer } from "@formily/reactive-react"
import { IProTableConfig } from "../context/IProTableConfig"
import { TableToolbarShell } from "./TableToolbarShell"
import { RecursionField, useFieldSchema } from '@formily/react';
import { Schema } from "@formily/react";
import "./style.less";

export interface ITableToolbarProps {
  className?: string,
  hasActions?: boolean,
  hasRefresh?: boolean,
  hasHeight?: boolean,
  hasSettings?: boolean,
}

export const TableToolbar = observer((
  props: ITableToolbarProps
) => {
  const { hasActions = true, ...other } = props;
  const params = useProTableParams();
  const tableConfig: IProTableConfig = useComponentConfig(params.path);
  const fieldSchema = useFieldSchema()

  useEffect(() => {
    params.tableConfig = tableConfig;
  }, [params, tableConfig])

  const slots = useMemo(() => {
    const slts = {
      children: [],
      actions: null,
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'ProTable.ToolbarContent') {
        slts.children.push(childSchema)
      } else if (childSchema["x-component"] === 'ProTable.ToolbarActions') {
        slts.actions = childSchema
      }
    }

    return slts;
  }, [fieldSchema])

  return (
    <TableToolbarShell
      {...other}
      actions={
        hasActions && slots.actions && <RecursionField schema={slots.actions} name={slots.actions.name} />
      }
    >
      {
        slots.children?.map((child) => {
          return <RecursionField key={child.name} schema={child} name={child.name} />
        })
      }
    </TableToolbarShell>
  )
})
