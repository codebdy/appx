import React from "react";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageEngine } from "../../../../PageEngine";
import { components } from "../../../../../../AppRunner/PCRunner/components";
import { ExpressionScope } from '@formily/react';
import { useGetMenuItem } from "../../../../../framewidgets/pc/AppMenu/view/hooks/useGetMenuItem";
import { useEntryPageId } from "../../../../../framewidgets/pc/AppMenu/view/hooks/useEntryPageId";
import { OpenPageType } from "../../../../../../plugin-sdk/model/action";

export interface ILoadingSpanProps {
  spinning?: boolean,
  children?: React.ReactNode
}

export const RootPage = memo(() => {
  const { menuUuid, pageId } = useParams();
  const { dataId } = useParams();
  const getMenuItem = useGetMenuItem();
  const entryId = useEntryPageId();
  const pageIdFormMenu = useMemo(() => getMenuItem(menuUuid)?.route?.pageId, [getMenuItem, menuUuid])
  const realPageId = useMemo(() => pageId || pageIdFormMenu || entryId, [entryId, pageId, pageIdFormMenu])

  return (
    <ExpressionScope value={{
      $params: {
        openType: OpenPageType.RouteTo,
        dataId
      }
    }}>
      {
        realPageId &&
        <PageEngine
          pageId={realPageId}
          components={components}
        />
      }

    </ExpressionScope>
  )
})
