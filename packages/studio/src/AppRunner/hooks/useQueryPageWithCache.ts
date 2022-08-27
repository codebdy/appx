import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { useQueryPage } from "../../hooks/useQueryPage";
import { useAppViewKey } from "../../shared/AppRoot/context";
import { pagesCacheState } from "../recoil/atoms";


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

  return { page: page || pageInCache, error, loading }
}