import React from "react";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PageEngine } from "../../PageEngine";
import { useGetMenuItem } from "../../hooks/useGetMenuItem";
import { useEntryPageId } from "../../hooks/useEntryPageId";
import { PageContext } from "../../context/page";
import { OpenPageType } from "../../../shared/action";
import { components } from "../components";

export interface ILoadingSpanProps {
  spinning?: boolean,
  children?: React.ReactNode
}

export const RootPage = memo(() => {
  const { menuUuid, pageId } = useParams();
  const getMenuItem = useGetMenuItem();
  const entryId = useEntryPageId();

  const pageIdFormMenu = useMemo(() => getMenuItem(menuUuid)?.route?.pageId, [getMenuItem, menuUuid])


  const realPageId = useMemo(() => pageId || pageIdFormMenu || entryId, [entryId, pageId, pageIdFormMenu])

  return (
    <PageContext.Provider value={{ openType: OpenPageType.RouteTo }}>
      <PageEngine
        pageId={realPageId}
        components={components}
      />
    </PageContext.Provider>
  )
})
