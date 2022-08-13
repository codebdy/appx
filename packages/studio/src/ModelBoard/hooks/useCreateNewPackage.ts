import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { createUuid, ID } from "../../shared";
import { PackageMeta } from "../meta/PackageMeta";
import { packagesState } from './../recoil/atoms';

export function useCreateNewPackage(appUuid: ID) {
  const packages = useRecoilValue(packagesState(appUuid));
  const { t } = useTranslation();
  const getNewPackageName = useCallback(() => {
    const prefix = t("ModelBoard.NewPackage");
    let index = 1;
    // eslint-disable-next-line no-loop-func
    while (packages.find((pkg) => pkg.name === (prefix + index))) {
      index++;
    }

    return prefix + index;
  }, [packages, t]);

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
