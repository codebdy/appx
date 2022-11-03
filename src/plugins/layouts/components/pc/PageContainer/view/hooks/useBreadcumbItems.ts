import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { IMenuItem, useParseLangMessage } from "@rxdrag/plugin-sdk";
import { useMenu } from "~/AppRunner/hooks/useMenu";
import { usePage } from "~/plugin-sdk/contexts/page";

export function useBreadcumbItems() {
  const menu = useMenu();
  const { device, appId, menuUuid } = useParams();
  const p = useParseLangMessage();

  const page = usePage();
  const getMenuItemPath = useCallback((uuid: string, items?: IMenuItem[]): IMenuItem[] => {
    let path = [];
    for (const item of items || menu?.schemaJson?.items || []) {
      path = [item]
      if (item.uuid === uuid) {
        return path;
      }
      const children = getMenuItemPath(uuid, item?.children || []);
      if (children.length > 0) {
        path.push(...children);
        return path;
      }
    }

    return [];
  }, [menu?.schemaJson?.items])

  const breadCumbs = useMemo(() => {
    const items: Route[] = [];
    const mnUuid = menuUuid
    const menuPath = getMenuItemPath(mnUuid);
    for (const item of menuPath) {
      items.push({
        breadcrumbName: p(item.title),
        path: item.route?.pageUuid && `/${device}/${appId}/${mnUuid || 'no'}/${item.route?.pageUuid}`
      })
    }
    items.push({
      breadcrumbName: p(page.title),
      path: "",
    })
    return items;
  }, [appId, device, getMenuItemPath, menuUuid, p, page])

  return breadCumbs;
}