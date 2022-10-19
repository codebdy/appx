import React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParseLangMessage } from "@rxdrag/plugin-sdk";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";

export function useAssociation(element: any, modeler: any): IElement {
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Association"),
      name: false,
      icon: <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path stroke="#000" stroke-width="2" fill="none" stroke-dasharray="3.3,6" stroke-linecap="square" d="M1.5 30.5l29-29"></path></svg>,
    }
  }, [element, name]);

  return iElement;
}