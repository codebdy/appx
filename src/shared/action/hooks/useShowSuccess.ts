import { message } from "antd";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ISuccessAction } from "@rxdrag/plugin-sdk/model/action";

export function useShowSuccess() {
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const show = useCallback((successAction?: ISuccessAction) => {
    message.success(p(successAction?.message) || t("OperateSuccess"))
  }, [p, t])

  return show;
}