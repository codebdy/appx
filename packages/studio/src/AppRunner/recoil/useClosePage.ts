import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { OpenPageType } from "../../shared/action";
import { useAppViewKey } from "../../shared/AppRoot/context";
import { usePageParams } from "../context/page";
import { pagePopupsState } from "./atoms";

export function useClosePage() {
  const key = useAppViewKey();
  const pageParams = usePageParams()
  const setPagePopups = useSetRecoilState(pagePopupsState(key));

  const close = useCallback(() => {
    if (pageParams.openType === OpenPageType.RouteTo) {
      window.history.back()
    } else {
      setPagePopups(pgDialogs => pgDialogs.filter(pgDialog => pgDialog.id !== pageParams?.containerId))
    }

  }, [pageParams?.containerId, pageParams.openType, setPagePopups])

  return close;
}