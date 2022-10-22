import { useMemo } from "react";
import { useQueryApp } from "~/hooks/useQueryApp";
import { ID } from "~/shared";

export function usePublished(appId: ID) {
  const { app } = useQueryApp(appId)

  const published = useMemo(() => {
    if (!app) {
      return false;
    }
    if (app.publishMetaAt && (new Date(app.publishMetaAt).getMilliseconds() >= new Date(app.saveMetaAt).getMilliseconds())) {
      return true;
    }

    if (!app.saveMetaAt) {
      return false;
    }
    if (!app.publishMetaAt && app.saveMetaAt) {
      return true;
    }
  }, [app])

  return published;
}