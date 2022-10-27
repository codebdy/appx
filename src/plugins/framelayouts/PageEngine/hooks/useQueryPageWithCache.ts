import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useQueryPage } from "~/AppDesigner/hooks/useQueryPage";
import { useDesignerViewKey } from "~/plugin-sdk/contexts/desinger";
import { pagesCacheState } from "@rxdrag/plugin-sdk/atoms";

export function useQueryPageWithCache(id?: string) {
  const key = useDesignerViewKey();
  const [pages, setPages] = useRecoilState(pagesCacheState(key))

  const pageInCache = useMemo(() => pages.find(pg => pg.id === id), [id, pages]);

  const { page, error, loading } = useQueryPage(pageInCache ? undefined : id);

  useEffect(() => {
    if (page) {
      setPages(pages => ([...pages, page]))
    }
  }, [page, setPages])

  const realPage = useMemo(() => {
    return pageInCache || page
  }, [page, pageInCache])

  return { page: realPage, error, loading }
}