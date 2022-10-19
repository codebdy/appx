import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { codesState, selectedCodeState } from "../recoil/atoms";

export function useSelectedCode(appUuid: ID) {
  const selectedCodeId = useRecoilValue(selectedCodeState(appUuid));
  const codes = useRecoilValue(codesState(appUuid));

  return codes.find((code) => code.uuid === selectedCodeId);
}
