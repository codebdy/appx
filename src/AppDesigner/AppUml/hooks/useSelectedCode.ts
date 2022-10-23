import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { codesState, selectedCodeState } from "../recoil/atoms";

export function useSelectedCode(appId: ID) {
  const selectedCodeId = useRecoilValue(selectedCodeState(appId));
  const codes = useRecoilValue(codesState(appId));

  return codes.find((code) => code.uuid === selectedCodeId);
}
