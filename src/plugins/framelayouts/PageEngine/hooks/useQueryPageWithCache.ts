import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { pagesCacheState } from "@rxdrag/plugin-sdk/atoms";
import { useAppViewKey } from "~/plugin-sdk/contexts/app";
import { useQueryPage } from "~/AppRunner/hooks/useQueryPage";

export function useQueryPageWithCache(id?: string) {
  const key = useAppViewKey();
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