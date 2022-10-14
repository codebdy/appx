import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { classesState } from "../../AppUml/recoil/atoms";
import { ID } from "../../shared";
import { StereoType } from "../../AppUml/meta/ClassMeta";

export function useGetPackageCanAuthClasses(appUuid:ID) {

  const classes = useRecoilValue(classesState(appUuid));

  const getClasses = useCallback((packageUuid: ID) => {
    return classes.filter(
      cls => cls.packageUuid === packageUuid &&
        (cls.stereoType === StereoType.Entity ||
          cls.stereoType === StereoType.Service ||
          cls.stereoType === StereoType.ThirdParty
        ))
  }, [classes])

  return getClasses;
}