import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "~/shared";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useGetFirstParentUuids } from "./useGetFirstParentUuids";

export function useRootClasses(appUuid: ID) {
  const classes = useRecoilValue(classesState(appUuid));
  const getParentuuids = useGetFirstParentUuids(appUuid);
  const entities = useMemo(() => {
    return classes.filter(
      (cls) =>
        (cls.stereoType === StereoType.Entity ||
          cls.stereoType === StereoType.Abstract) &&
        getParentuuids(cls.uuid).length === 0
    );
  }, [classes, getParentuuids]);

  return entities;
}
