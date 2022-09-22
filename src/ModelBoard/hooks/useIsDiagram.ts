import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { diagramsState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsDiagram(appUuid: ID) {
  const diagrams = useRecoilValue(diagramsState(appUuid))

  const isDiagram = useCallback((uuid: string) => {
    return diagrams.find(d => d.uuid === uuid)
  }, [diagrams])

  return isDiagram
}