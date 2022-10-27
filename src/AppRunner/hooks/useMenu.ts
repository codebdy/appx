import { useMemo } from "react";
import { useAppParams } from "~/plugin-sdk/contexts/app";

export function useMenu() {
  const { app, device } = useAppParams();

  const menu = useMemo(() => {
    return app?.partsOfMenu?.find(mu => mu.device === device)
  }, [app, device])

  return menu;
}