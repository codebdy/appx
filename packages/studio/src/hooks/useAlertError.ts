import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export function useAlertError() {
  // const setError = useSetRecoilState(appErrorState);

  const alertError = useCallback((message: string) => {
    // setError(message);
  }, []);

  return alertError;
}
