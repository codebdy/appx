import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../../shared";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";

export function useEnums(appUuid: ID) {
  const entities = useRecoilValue(classesState(appUuid));
  const enums = useMemo(() => {
    return entities.filter((entity) => entity.stereoType === StereoType.Enum);
  }, [entities]);

  return enums;
}
