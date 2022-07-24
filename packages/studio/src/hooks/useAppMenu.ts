import { ID } from "../model";
import { STORAGE_KEY_MENUS, STORAGE_KEY_PAGES } from "./consts";
import { IQueryResponse } from "./IQueryResponse";
import { IPage, IMenu } from './../model/index';

export function useAppMenu(pageId: ID, deviceSlug: string): IQueryResponse<IMenu> {
  const menusStr = localStorage.getItem(STORAGE_KEY_MENUS)
  if (menusStr) {
    const allMenus: IMenu[] = JSON.parse(menusStr)
    const filteredMenus = allMenus.filter(menu => menu.app?.id === pageId && menu.deviceSlug === deviceSlug)
    if (filteredMenus.length > 0) {
      return { data: filteredMenus[0] }
    }

  }

  return {}
}