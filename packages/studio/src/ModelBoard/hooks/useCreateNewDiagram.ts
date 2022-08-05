import { useSetRecoilState } from "recoil";
import { diagramsState } from "../recoil/atoms";
import { useGetDiagramByName } from "./useGetDiagramByName";
import { useCallback } from "react";
import { createUuid, ID } from "../../shared";
import { useTranslation } from "react-i18next";

export function useCreateNewDiagram(appUuid: ID) {
  const setDiagrams = useSetRecoilState(diagramsState(appUuid));
  const getDiagramByName = useGetDiagramByName(appUuid);
  const { t } = useTranslation();
  
  const getNewDiagramName = useCallback(() => {
    const prefix = t("model.NewDiagram");
    let index = 1;
    while (getDiagramByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getDiagramByName, t]);

  const createNewDiagram = useCallback((packageUuid) => {
    const newDiagram = {
      uuid: createUuid(),
      name: getNewDiagramName(),
      packageUuid,
      nodes: [],
      edges: [],
    };
    setDiagrams((entites) => [...entites, newDiagram]);
    return newDiagram;
  }, [getNewDiagramName, setDiagrams]);

  return createNewDiagram;
}
