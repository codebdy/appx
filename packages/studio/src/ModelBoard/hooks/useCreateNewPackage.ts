import { useCallback } from "react";
import { createUuid, ID } from "../../shared";
import { PackageMeta } from "../meta/PackageMeta";

export function useCreateNewPackage(appId: ID) {
  const createNewPackage = useCallback(
    () => {
      const newPackage: PackageMeta = {
        uuid: createUuid(),
        name: "New Package",
      };
      return newPackage;
    },
    []
  );

  return createNewPackage;
}
