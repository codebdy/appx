import { useRecoilValue } from "recoil";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { categoriesState } from "../recoil/atoms";

export function useCategories() {
  const { app } = useAppParams()
  return useRecoilValue(categoriesState(app?.uuid))
}