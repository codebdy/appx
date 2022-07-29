import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { relationsState, selectedElementState } from "../recoil/atoms";

export function useSelectedRelation(appUuid: ID) {
  const selectedElement = useRecoilValue(selectedElementState(appUuid));
  const relations = useRecoilValue(relationsState(appUuid));

  return relations.find((relation) => relation.uuid === selectedElement);
}
