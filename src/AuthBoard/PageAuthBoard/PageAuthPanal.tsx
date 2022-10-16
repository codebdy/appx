import React, { useCallback, useMemo } from "react"
import { memo } from "react"
import { IComponentAuthConfig, IPage, IPageCategory } from "../../model";
import { IDevice } from "../../hooks/useDevices"
import { Table } from "antd";
import { useColumns } from "./useColumns";
import { ID } from "../../shared";
import { IUiAuthRow } from "../IUiAuthConfig";
import { IMenuItem, MenuItemType, useParseLangMessage } from "../../plugin-sdk";
import { usePagesWithoutCategory } from "../hooks/usePagesWithoutCategory";
import { useGetCategoryPages } from "../hooks/useGetCategoryPages";

export const PageAuthPanal = memo((
  props: {
    device: IDevice,
    categories: IPageCategory[],
    pages: IPage[],
    roleId: ID,
    componentConfigs: IComponentAuthConfig[],
  }
) => {
  const { device, categories, pages, roleId, componentConfigs } = props;
  const columns = useColumns(roleId);
  const p = useParseLangMessage();
  const pagesWithoutCategory = usePagesWithoutCategory(pages, categories);
  const getCategoryPages = useGetCategoryPages(pages);

  const makeComponentItem = useCallback((item: IMenuItem) => {
    const menuItemConfig = componentConfigs?.find(config => config.roleId === roleId && config.componentId === item.uuid);
    return {
      key: item.uuid,
      menuItemUuid: item.uuid,
      name: p(item.title),
      menuConfig: menuItemConfig,
      device: device.key
    }
  }, [p, componentConfigs, roleId, device])

  const makePageItem = useCallback((page: IPage) => {
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

  const makeCategoryItem = useCallback((category: IPageCategory) => {
    const menuItemConfig = componentConfigs?.find(config => config.roleId === roleId && config.componentId === category.uuid);
    return {
      key: category.id,
      menuItemUuid: category.id,
      name: p(category.title),
      children: getCategoryPages(category.id).map(page => makePageItem(page)),
      menuConfig: menuItemConfig,
      device: device.key
    }
  }, [p, componentConfigs, roleId, device, makePageItem])

  const data: IUiAuthRow[] = useMemo(() => {
    const categoryItems = categories.map(category => makeCategoryItem(category))
    const pageItems = pagesWithoutCategory.map(page => makePageItem(page))
    return [...categoryItems, ...pageItems]
  }, [categories, makeCategoryItem, pagesWithoutCategory, makePageItem])

  return (
    <Table
      columns={columns}
      dataSource={data || []}
      pagination={false}
    />
  )
})