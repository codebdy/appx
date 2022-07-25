import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAlertError } from "../../hooks/useAlertError";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { ID } from "../../shared";
import { EVENT_CLASS_CHANGED, triggerCanvasEvent } from "../GraphCanvas/events";
import { ClassMeta } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeClass(appId: ID) {
  const backupSnapshot = useBackupSnapshot(appId);
  const setClasses = useSetRecoilState(classesState(appId));
  const classes = useRecoilValue(classesState(appId));
  const alertError = useAlertError();

  const changeClass = useCallback(
    (cls: ClassMeta) => {
      if (
        classes
          .filter((cl) => cl.uuid !== cls.uuid)
          .find((cl) => cl.name === cls.name)
      ) {
        alertError(getLocalMessage("model.error-name-repeat"));
        return;
      }
      backupSnapshot();
      setClasses((entities) =>
        entities.map((ent) => (ent.uuid === cls.uuid ? cls : ent))
      );
      triggerCanvasEvent({ name: EVENT_CLASS_CHANGED, detail: cls });
    },
    [alertError, backupSnapshot, classes, setClasses]
  );

  return changeClass;
}
