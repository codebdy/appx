import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { OpenPageType } from "..";
import { useAppViewKey } from "../../AppRoot/context";
import { pagePopupsState } from "../../../AppRunner/recoil/atoms";
import { useExpressionScope } from '@formily/react';

export function useClosePage() {
  const key = useAppViewKey();
  const { $params } = useExpressionScope()||{}
  const setPagePopups = useSetRecoilState(pagePopupsState(key));
  const close = useCallback(() => {

    if (!$params) {
      return;
    }
    if ($params.openType === OpenPageType.RouteTo) {
      window.history.back()
    } else {
      setPagePopups(pgDialogs => pgDialogs.filter(pgDialog => pgDialog.id !== $params?.containerId))
    }

  }, [$params, setPagePopups])

  return close;
}