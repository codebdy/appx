import { useCallback } from "react";
import { IMenuItem } from "@rxdrag/plugin-sdk/model/IMenuNode";
import { useMenu } from "~/AppRunner/hooks/useMenu";

export function useGetMenuItem() {
  const  menu  = useMenu();

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