import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { classesState } from "../recoil/atoms";

export function useGetClass(appUuid: ID) {
  const classes = useRecoilValue(classesState(appUuid));

  const getEntity = useCallback((uuid: string)=>{
    return classes.find((cls) => cls.uuid === uuid);
  }, [classes]);

  return getEntity;
}
