import { message } from "antd";
import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { ID } from "../../shared";
import { EVENT_CLASS_CHANGED, triggerCanvasEvent } from "../GraphCanvas/events";
import { ClassMeta } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";

export function useChangeClass(appUuid: ID) {
  const backupSnapshot = useBackupSnapshot(appUuid);
  const setClasses = useSetRecoilState(classesState(appUuid));
  const classes = useRecoilValue(classesState(appUuid));

  const changeClass = useCallback(
    (cls: ClassMeta) => {
      if (
        classes
          .filter((cl) => cl.uuid !== cls.uuid)
          .find((cl) => cl.name === cls.name)
      ) {
        message.error(getLocalMessage("model.error-name-repeat"));
        return;
      }
      backupSnapshot();
      setClasses((entities) =>
        entities.map((ent) => (ent.uuid === cls.uuid ? cls : ent))
      );
      triggerCanvasEvent({ name: EVENT_CLASS_CHANGED, detail: cls });
    },
    [backupSnapshot, classes, setClasses]
  );

  return changeClass;
}
