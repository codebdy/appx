import React from "react";
import { memo, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@formily/antd";
import { Button, PageContainer, ProTable, TextView } from "../../../components/pc";
import { PageEngine } from "../../PageEngine";
import { useGetMenuItem } from "../../hooks/useGetMenuItem";
import { useEntryPageId } from "../../hooks/useEntryPageId";
import { PageContext } from "../../context/page";
import { OpenPageType } from "../../../shared/action";

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
        components={{
          Input,
          Button,
          PageContainer,
          ProTable,
          TextView
        }}
      />
    </PageContext.Provider>
  )
})
