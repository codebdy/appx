import React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParseLangMessage } from "../../../plugin-sdk";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";

export function useInclusiveGateway(element: any, modeler: any): IElement {
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Inclusive Gateway"),
      name: p(name),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16.001 0a1.29 1.29 0 00-.917.373L.373 15.084a1.316 1.316 0 00.002 1.834l14.71 14.709a1.313 1.313 0 001.833 0l14.711-14.711a1.316 1.316 0 00-.002-1.834L16.917.372A1.294 1.294 0 0016.002 0zM16 2.181l13.821 13.821L16 29.823 2.179 16.003 16 2.18zm0 6.379a7.447 7.447 0 00-7.44 7.441A7.447 7.447 0 0016 23.443 7.447 7.447 0 0023.443 16a7.447 7.447 0 00-7.441-7.441zm0 .825a6.61 6.61 0 016.617 6.616A6.61 6.61 0 0116 22.618 6.61 6.61 0 019.385 16 6.61 6.61 0 0116 9.385z"></path></svg>,
      items: <></>
    }
  }, [element, name]);

  return iElement;
}