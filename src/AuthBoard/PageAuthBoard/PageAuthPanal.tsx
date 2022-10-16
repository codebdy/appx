import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IComponentAuthConfig, IPage } from "../../model";
import { IDevice } from "../../hooks/useDevices"
import { Table } from "antd";
import { useColumns } from "./useColumns";
import { ID } from "../../shared";
import { IUiAuthRow } from "../IUiAuthConfig";
import { IMenuItem, MenuItemType, useParseLangMessage } from "../../plugin-sdk";

export const PageAuthPanal = memo((
  props: {
    device: IDevice,
    page: IPage,
    roleId: ID,
    componentConfigs: IComponentAuthConfig[],
  }
) => {
  const { device, page, roleId, componentConfigs } = props;
  const columns = useColumns(roleId);
  const p = useParseLangMessage();

  const makeItem = useCallback((item: IMenuItem) => {
    const menuItemConfig = componentConfigs?.find(config => config.roleId === roleId && config.componentId === item.uuid);
    return {
      key: item.uuid,
      menuItemUuid: item.uuid,
      name: p(item.title),
      children: (item.type === MenuItemType.Group && !menuItemConfig?.refused)
        ? item.children?.map(itm => makeItem(itm))
        : undefined,
      menuConfig: menuItemConfig,
      device: device.key
    }
  }, [p, componentConfigs, roleId, device])

  const data: IUiAuthRow[] = useMemo(() => {
    return []//page?.schemaJson?.items.map(item => makeItem(item)) || []
  }, [page, makeItem])

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      pagination={false}
    />
  )
})