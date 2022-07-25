import { useCallback } from "react";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { createUuid, ID } from "../../shared";
import { PackageMeta } from "../meta/PackageMeta";

export function useCreateNewPackage(appId: ID) {
  const createNewPackage = useCallback(
    () => {
      const newPackage: PackageMeta = {
        uuid: createUuid(),
        name: getLocalMessage("model.NewPackage"),
      };
      return newPackage;
    },
    []
  );

  return createNewPackage;
}
