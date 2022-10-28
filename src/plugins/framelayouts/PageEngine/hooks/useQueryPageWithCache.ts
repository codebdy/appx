import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { pagesCacheState } from "@rxdrag/plugin-sdk/atoms";
import { useAppViewKey } from "~/plugin-sdk/contexts/app";
import { useQueryPageByUuid } from "./useQueryPageByUuid";

export function useQueryPageWithCache(uuid?: string) {
  const key = useAppViewKey();
  const [pages, setPages] = useRecoilState(pagesCacheState(key))

  const pageInCache = useMemo(() => pages.find(pg => pg.uuid === uuid), [uuid, pages]);

  const { page, error, loading } = useQueryPageByUuid(pageInCache ? undefined : uuid);

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