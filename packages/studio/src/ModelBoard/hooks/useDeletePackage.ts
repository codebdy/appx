import { ID } from "../../shared";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { diagramsState, packagesState } from './../recoil/atoms';

/**
 * 并没有删除包下面的元素，保存数据时需要过滤一下
 * @param appId 
 * @returns 
 */
export function useDeletePackage(appId: ID) {
  const setPackages = useSetRecoilState(packagesState(appId));
  const backup = useBackupSnapshot(appId);

  const deletePackage = useCallback((uuid: string) => {
    backup()
    setPackages(packages => packages.filter(pkg => pkg.uuid !== uuid))
  }, [])

  return deletePackage
}