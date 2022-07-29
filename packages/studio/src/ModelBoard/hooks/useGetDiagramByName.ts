import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { diagramsState } from "../recoil/atoms";

export function useGetDiagramByName(appUuid: ID) {
  const diagrams = useRecoilValue(diagramsState(appUuid));

  const getDiagramByName = useCallback((name: string) => {
    return diagrams.find((diagram) => diagram.name === name);
  }, [diagrams]);

  return getDiagramByName;
}
