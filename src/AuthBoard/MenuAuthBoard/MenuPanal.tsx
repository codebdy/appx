import React from "react"
import { memo } from "react"
import { IMenu } from "../../model";
import { IDevice } from "../../hooks/useDevices"
import { Table } from "antd";
import { useColumns } from "./useColumns";
import { ID } from "../../shared";

export const MenuPanal = memo((
  props: {
    device: IDevice,
    menu: IMenu,
    roleId: ID,
  }
) => {
  const { device, menu, roleId } = props;
  const columns = useColumns(roleId);

  return (
    <Table
      columns={columns}
      dataSource={[]}
      pagination={false}
    />
  )
})