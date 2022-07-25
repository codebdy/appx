import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { classesState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsElement(appId: ID) {
  const classes = useRecoilValue(classesState(appId))

  const isElement = useCallback((uuid: string) => {
    return classes.find(cls => cls.uuid === uuid)
  }, [classes])

  return isElement
}