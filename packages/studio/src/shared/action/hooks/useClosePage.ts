import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { OpenPageType } from "..";
import { useAppViewKey } from "../../AppRoot/context";
import { usePageParams } from "../../../AppRunner/context/page";
import { pagePopupsState } from "../../../AppRunner/recoil/atoms";

export function useClosePage() {
  const key = useAppViewKey();
  const pageParams = usePageParams()
  const setPagePopups = useSetRecoilState(pagePopupsState(key));

  const close = useCallback(() => {
    if (!pageParams) {
      return;
    }
    if (pageParams.openType === OpenPageType.RouteTo) {
      window.history.back()
    } else {
      setPagePopups(pgDialogs => pgDialogs.filter(pgDialog => pgDialog.id !== pageParams?.containerId))
    }

  }, [pageParams, setPagePopups])

  return close;
}