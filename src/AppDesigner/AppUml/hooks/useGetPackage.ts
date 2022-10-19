import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { packagesState } from './../recoil/atoms';

export function useGetPackage(appUuid: ID) {
  const packages = useRecoilValue(packagesState(appUuid));

  const getEntity = useCallback((uuid: string)=>{
    return packages.find((pkg) => pkg.uuid === uuid);
  }, [packages]);

  return getEntity;
}
