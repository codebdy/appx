import { useCallback } from "react";
import { IMenuItem } from "@rxdrag/plugin-sdk/model/IMenuNode";
import { ID } from "~/shared";
import { useRunnerParams } from "@rxdrag/plugin-sdk/contexts/runner";

export function useGetMenuItemByPageUuid() {
  const { menu } = useRunnerParams();

  const getMenuItem = useCallback((pageUuid: ID, items?: IMenuItem[]): IMenuItem => {
    for (const item of items || menu?.schemaJson?.items || []) {
      if (item.route?.pageUuid === pageUuid) {
        return item;
      }
      const child = getMenuItem(pageUuid, item?.children || []);
      if (child) {
        return child;
      }
    }
  }, [menu?.schemaJson?.items])

  return getMenuItem
}