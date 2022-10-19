import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { relationsState } from "../recoil/atoms";

export function useRelation(uuid: string, appUuid: ID) {
  const relations = useRecoilValue(relationsState(appUuid));

  return relations.find((relation) => relation.uuid === uuid);
}
