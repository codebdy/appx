import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { pagePopupsState } from "@rxdrag/plugin-sdk/atoms";
import { useExpressionScope } from '@formily/react';
import { OpenPageType } from "@rxdrag/plugin-sdk";

export function useClosePage() {
  const key = useDesignerViewKey();
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