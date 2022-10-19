import { useCallback } from "react";
import { useCreateNewClass } from "./useCreateNewClass";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { StereoType } from "../meta/ClassMeta";
import { ID } from "~/shared";
import { useSelectedDiagramPackageUuid } from "./useSelectedDiagramPackageUuid";

export function useCreateTempClassNodeForNew(appUuid: ID) {
  const packageUuid = useSelectedDiagramPackageUuid(appUuid)
  const creatNewClassMeta = useCreateNewClass(appUuid);
  const createTempClassNodeForNew = useCallback(
    (stereoType: StereoType) => {
      const classMeta = creatNewClassMeta(stereoType, packageUuid);
      if (
        stereoType === StereoType.ValueObject ||
        stereoType === StereoType.Enum
      ) {
        classMeta.methods = [];
      }
      return {
        uuid: "entityMeta.uuid",
        ...NODE_INIT_SIZE,

        shape: "react-shape",
        data: {
          ...classMeta,
          //root: stereoType === StereoType.Partial,
          isTempForNew: true,
        },
      };
    },
    [creatNewClassMeta, packageUuid]
  );
  return createTempClassNodeForNew;
}
