import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { classesState } from "../recoil/atoms";

export function useClass(uuid: string, appUuid: ID) {
  const entites = useRecoilValue(classesState(appUuid));

  return entites.find((cls) => cls.uuid === uuid);
}
