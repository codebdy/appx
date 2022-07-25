import { useSetRecoilState } from "recoil";
import { diagramsState } from "../recoil/atoms";
import { useGetDiagramByName } from "./useGetDiagramByName";
import { useCallback } from "react";
import { createUuid, ID } from "../../shared";
import { getLocalMessage } from "../../locales/getLocalMessage";

export function useCreateNewDiagram(appId: ID) {
  const setDiagrams = useSetRecoilState(diagramsState(appId));
  const getDiagramByName = useGetDiagramByName(appId);

  const getNewDiagramName = useCallback(() => {
    const prefix = getLocalMessage("model.add-diagram");
    let index = 1;
    while (getDiagramByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getDiagramByName]);

  const createNewDiagram = useCallback(() => {
    const newDiagram = {
      uuid: createUuid(),
      name: getNewDiagramName(),
      nodes: [],
      edges: [],
    };
    setDiagrams((entites) => [...entites, newDiagram]);
    return newDiagram;
  }, [getNewDiagramName, setDiagrams]);

  return createNewDiagram;
}
