import { ID } from "../../shared";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { useCallback } from 'react';

export function useDeletePackage(appId: ID) {
  const backup = useBackupSnapshot(appId)
  const deletePackage = useCallback((uuid:string)=>{
    backup()
  }, [])

  return deletePackage
}