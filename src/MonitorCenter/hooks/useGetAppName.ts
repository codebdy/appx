import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { SYSTEM_APP_UUID } from "../../consts";
import { useParseLangMessage } from "../../plugin-sdk";
import { appsState } from "../../recoil/atoms";

export function useGetAppName() {
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const apps = useRecoilValue(appsState);

  const getName = useCallback((uuid: string) => {
    if (uuid === SYSTEM_APP_UUID) {
      return t("Monitor.RootApp")
    }
    return p(apps?.find(app => app.uuid === uuid)?.title)
  }, [apps, t, p])

  return getName;
}
