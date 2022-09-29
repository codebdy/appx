import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { diagramsState } from "../recoil/atoms";
import { selectedDiagramState } from '../recoil/atoms';

export function useSelectedDiagramPackageUuid(appUuid: ID) {
  const diagrams = useRecoilValue(diagramsState(appUuid));
  const selectedDiagramId = useRecoilValue(selectedDiagramState(appUuid));
  return diagrams.find(diagram => diagram.uuid === selectedDiagramId)?.packageUuid;
}