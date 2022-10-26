import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { IMenuItem, useParseLangMessage, useRunnerParams } from "@rxdrag/plugin-sdk";

export function useBreadcumbItems() {
  const { menu } = useRunnerParams();
  const { device, appId, menuUuid } = useParams();
  const p = useParseLangMessage();

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
    const menuPath = getMenuItemPath(menuUuid);
    for (const item of menuPath) {
      items.push({
        breadcrumbName: p(item.title),
        path: item.route?.pageUuid && `/app/${device}/${appId}/${item.route?.pageUuid}`
      })
    }
    return items;
  }, [appId, device, getMenuItemPath, menuUuid, p])

  return breadCumbs;
}