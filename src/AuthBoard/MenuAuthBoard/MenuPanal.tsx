import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IMenu, IMenuAuthConfig } from "../../model";
import { IDevice } from "../../hooks/useDevices"
import { Table } from "antd";
import { useColumns } from "./useColumns";
import { ID } from "../../shared";
import { IUiAuthRow } from "../IUiAuthConfig";
import { IMenuItem, MenuItemType, useParseLangMessage } from "../../plugin-sdk";

export const MenuPanal = memo((
  props: {
    device: IDevice,
    menu: IMenu,
    roleId: ID,
    menuConfigs: IMenuAuthConfig[],
  }
) => {
  const { device, menu, roleId, menuConfigs } = props;
  const columns = useColumns(roleId);
  const p = useParseLangMessage();

  const makeItem = useCallback((item: IMenuItem) => {
    return {
      key: item.uuid,
      uuid: item.uuid,
      name: p(item.title),
      children: item.type === MenuItemType.Group ? item.children?.map(itm => makeItem(itm)) : undefined,
      menuConfig: menuConfigs?.find(config => config.roleId === roleId && config.menuItemUuid === item.uuid)
    }
  }, [p, menuConfigs, roleId])

  const data: IUiAuthRow[] = useMemo(() => {
    return menu?.schemaJson?.items.map(item => makeItem(item)) || []
  }, [menu, makeItem])

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      pagination={false}
    />
  )
})