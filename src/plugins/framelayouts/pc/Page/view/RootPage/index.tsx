import React from "react";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageEngine } from "../../../../PageEngine";
import { ExpressionScope } from '@formily/react';
import { useGetMenuItem } from "../../../../../framewidgets/pc/AppMenu/view/hooks/useGetMenuItem";
import { useEntryPageUuid } from "../../../../../framewidgets/pc/AppMenu/view/hooks/useEntryPageId";
import { OpenPageType } from "@rxdrag/plugin-sdk/model/action";
import { useRunnerParams } from "@rxdrag/plugin-sdk/contexts/runner";

export interface ILoadingSpanProps {
  spinning?: boolean,
  children?: React.ReactNode
}

export const RootPage = memo(() => {
  const { menuUuid, pageUuid } = useParams();
  const { components } = useRunnerParams();
  const { dataId } = useParams();
  const getMenuItem = useGetMenuItem();
  const entryUuid = useEntryPageUuid();
  const pageUuidFormMenu = useMemo(() => getMenuItem(menuUuid)?.route?.pageUuid, [getMenuItem, menuUuid])
  const realPageUuid = useMemo(() => pageUuid || pageUuidFormMenu || entryUuid, [entryUuid, pageUuid, pageUuidFormMenu])

  return (
    <ExpressionScope value={{
      $params: {
        openType: OpenPageType.RouteTo,
        dataId
      }
    }}>
      {
        realPageUuid &&
        <PageEngine
          pageUuid={realPageUuid}
          components={components}
        />
      }

    </ExpressionScope>
  )
})
