import { ID } from "../../shared";
import { useRecoilValue } from 'recoil';
import { classesState } from "../recoil/atoms";
import { useCallback } from 'react';

export function useIsElement(appId: ID) {
  const classes = useRecoilValue(classesState(appId));

  const isElement = useCallback((uuid: string) => {
    for (const cls of classes) {
      if (cls.uuid === uuid) {
        return true;
      }
      for (const attr of cls.attributes) {
        if (attr.uuid === uuid) {
          return true;
        }
      }
      for (const method of cls.methods) {
        if (method.uuid === uuid) {
          return true;
        }
      }
    }
    return false
  }, [classes])

  return isElement
}