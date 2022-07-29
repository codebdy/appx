import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { createUuid, ID } from "../../shared";
import { PackageMeta } from "../meta/PackageMeta";
import { useGetPackageByName } from "./useGetPackageByName";
import { packagesState } from './../recoil/atoms';

export function useCreateNewPackage(appUuid: ID) {
  const packages = useRecoilValue(packagesState(appUuid));
  const getPackageByName = useGetPackageByName(appUuid);
  const getNewPackageName = useCallback(() => {
    const prefix = getLocalMessage("model.NewPackage");
    let index = 1;
    while (packages.find((pkg) => pkg.name === (prefix + index))) {
      index++;
    }

    return prefix + index;
  }, [getPackageByName, packages]);

  const createNewPackage = useCallback(
    () => {
      const newPackage: PackageMeta = {
        uuid: createUuid(),
        name: getNewPackageName(),
      };
      return newPackage;
    },
    [getNewPackageName]
  );

  return createNewPackage;
}
