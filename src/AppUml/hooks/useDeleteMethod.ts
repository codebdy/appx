import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { classesState } from "../recoil/atoms";
import { useChangeClass } from "./useChangeClass";

export function useDeleteMethod(appUuid: ID) {
  const changeClass = useChangeClass(appUuid);
  const clses = useRecoilValue(classesState(appUuid))

  const deleteMethod = useCallback(
    (methodUuid: string) => {
      for(const cls of clses){
        if(cls.methods.find((mthd) => mthd.uuid === methodUuid)){
          changeClass({
            ...cls,
            methods: cls.methods.filter(
              (mth) => mth.uuid !== methodUuid
            ),
          })
        }
      }
    },
    [changeClass, clses]
  );

  return deleteMethod;
}
