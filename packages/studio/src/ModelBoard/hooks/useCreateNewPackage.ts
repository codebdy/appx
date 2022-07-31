import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { createUuid, ID } from "../../shared";
import { PackageMeta } from "../meta/PackageMeta";
import { packagesState } from './../recoil/atoms';

export function useCreateNewPackage(appUuid: ID) {
  const packages = useRecoilValue(packagesState(appUuid));
  const getNewPackageName = useCallback(() => {
    const prefix = getLocalMessage("model.NewPackage");
    let index = 1;
    // eslint-disable-next-line no-loop-func
    while (packages.find((pkg) => pkg.name === (prefix + index))) {
      index++;
    }

    return prefix + index;
  }, [packages]);

  const createNewPackage = useCallback(
    () => {
      const newPackage: PackageMeta = {
        appUuid,
        uuid: createUuid(),
        name: getNewPackageName(),
      };
      return newPackage;
    },
    [appUuid, getNewPackageName]
  );

  return createNewPackage;
}
