import { Route } from "antd/lib/breadcrumb/Breadcrumb";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import { IMenuItem } from "../../model/IMenuNode";
import { useRunnerParams } from "../../plugin-sdk/contexts/runner";

export function useBreadcumbItems() {
  const { menu } = useRunnerParams();
  const { device, appUuid, menuUuid } = useParams();
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
        path: item.route?.pageId && `/app/${device}/${appUuid}/${item.route?.pageId}`
      })
    }
    return items;
  }, [appUuid, device, getMenuItemPath, menuUuid, p])

  return breadCumbs;
}