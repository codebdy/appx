import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { diagramsState } from "../recoil/atoms";
import { selectedDiagramState } from './../recoil/atoms';

export function useSelectedDiagramPackageUuid(appId: ID) {
  const diagrams = useRecoilValue(diagramsState(appId));
  const selectedDiagramId = useRecoilValue(selectedDiagramState(appId));
  return diagrams.find(diagram => diagram.uuid === selectedDiagramId)?.packageUuid;
}