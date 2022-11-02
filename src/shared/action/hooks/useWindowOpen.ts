import { useCallback } from "react";
import { useInstanceParams } from "~/plugin-sdk";
import { parseRoute } from "./parseRoute";

export function useWindowOpen() {
  const { instance } = useInstanceParams()
  const navigateRoute = useCallback((route: string) => {
    const realRoute = parseRoute(route, instance);
    window.open(realRoute)
  }, [instance])

  return navigateRoute;
}