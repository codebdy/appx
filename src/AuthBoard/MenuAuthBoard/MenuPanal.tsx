import React, { useMemo } from "react"
import { memo } from "react"
import { IMenu } from "../../model";
import { IDevice } from "../../hooks/useDevices"
import { Table } from "antd";
import { useColumns } from "./useColumns";
import { ID } from "../../shared";
import { IUiAuthConfig } from "../IUiAuthConfig";
import { useParseLangMessage } from "../../plugin-sdk";

export const MenuPanal = memo((
  props: {
    device: IDevice,
    menu: IMenu,
    roleId: ID,
  }
) => {
  const { device, menu, roleId } = props;
  const columns = useColumns(roleId);
  const p = useParseLangMessage();

  const data: IUiAuthConfig[] = useMemo(() => {
    return menu?.schemaJson?.items.map(item => {
      return {
        key: item.uuid,
        name: p(item.title),
        children: [],
      }
    }) || []
  }, [menu])

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      pagination={false}
    />
  )
})