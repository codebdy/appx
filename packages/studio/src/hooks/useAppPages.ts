import { IPage } from './../model/index';
import { ID } from "../shared";

export function useAppPages(pageId: ID, deviceSlug: string): IQueryResponse<IPage[]> {
  const pagesStr = localStorage.getItem(STORAGE_KEY_PAGES)
  if (pagesStr) {
    const allPages: IPage[] = JSON.parse(pagesStr)
    return { data: allPages.filter(page => page.app?.id === pageId && page.deviceSlug === deviceSlug) }
  }
}