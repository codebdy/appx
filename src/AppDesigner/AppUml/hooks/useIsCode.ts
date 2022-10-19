import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { codesState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsCode(appUuid: ID) {
  const codes = useRecoilValue(codesState(appUuid))

  const isCode = useCallback((uuid: string) => {
    return codes.find(code => code.uuid === uuid)
  }, [codes])

  return isCode
}