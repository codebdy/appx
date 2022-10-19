import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { codesState } from "../recoil/atoms";

export function useGetCodeByName(appUuid: ID) {
  const codes = useRecoilValue(codesState(appUuid));

  const getCodeByName = useCallback((name: string) => {
    return codes.find((code) => code.name === name);
  }, [codes]);

  return getCodeByName;
}
