import { message } from "antd";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ISuccessAction } from "../model";

export function useShowSuccess() {
  const { t } = useTranslation();
  const show = useCallback((successAction?: ISuccessAction) => {
    message.success(successAction?.message || t("OperateSuccess"))
  }, [t])

  return show;
}