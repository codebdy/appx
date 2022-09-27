import { useCallback } from "react";
import { IMenuItem } from "../../../../../../plugin-sdk/model/IMenuNode";
import { useRunnerParams } from "../../../../../../plugin-sdk/contexts/runner";

export function useGetMenuItem() {
  const { menu } = useRunnerParams();

  const getMenuItem = useCallback((uuid: string, items?: IMenuItem[]): IMenuItem => {
    for (const item of items || menu?.schemaJson?.items || []) {
      if (item.uuid === uuid) {
        return item;
      }
      const child = getMenuItem(uuid, item?.children || []);
      if (child) {
        return child;
      }
    }
  }, [menu?.schemaJson?.items])

  return getMenuItem
}