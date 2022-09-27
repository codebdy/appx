import { useCallback } from "react";
import { IMenuItem } from "../../../../../../plugin-sdk/model/IMenuNode";
import { ID } from "../../../../../../shared";
import { useRunnerParams } from "../../../../../../plugin-sdk/contexts/runner";

export function useGetMenuItemByPageId() {
  const { menu } = useRunnerParams();

  const getMenuItem = useCallback((pageId: ID, items?: IMenuItem[]): IMenuItem => {
    for (const item of items || menu?.schemaJson?.items || []) {
      if (item.route?.pageId === pageId) {
        return item;
      }
      const child = getMenuItem(pageId, item?.children || []);
      if (child) {
        return child;
      }
    }
  }, [menu?.schemaJson?.items])

  return getMenuItem
}