import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { classesState } from "../recoil/atoms";

export function useAttribute(uuid: string, appUuid: ID) {
  const classes = useRecoilValue(classesState(appUuid));

  const rt = useMemo(() => {
    for (const cls of classes) {
      if (!cls.attributes) {
        continue;
      }
      for (const attribute of cls.attributes) {
        if (attribute.uuid === uuid) {
          return { cls, attribute };
        }
      }
    }

    return {};
  }, [classes, uuid]);

  return rt;
}
