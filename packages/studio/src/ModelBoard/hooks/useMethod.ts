import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { classesState } from "../recoil/atoms";

export function useMethod(uuid: string, appUuid: ID) {
  const classes = useRecoilValue(classesState(appUuid));

  const rt = useMemo(() => {
    for (const cls of classes) {
      if (!cls.methods) {
        continue;
      }
      for (const method of cls.methods) {
        if (method.uuid === uuid) {
          return { cls, method };
        }
      }
    }

    return {};
  }, [classes, uuid]);

  return rt;
}
