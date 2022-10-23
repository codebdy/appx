import { useCallback } from "react";
import { ID } from "~/shared";
import { Type, Types } from "../meta/Type";
import { useGetClass } from "./useGetClass";

export function useGetTypeLabel(appId: ID) {
  const getClass = useGetClass(appId);

  const typeName = useCallback(
    (type: Type, typeUuid?: string): string => {
      if (
        type === Types.ID ||
        type === Types.Boolean ||
        type === Types.Int ||
        type === Types.Float ||
        type === Types.String ||
        type === Types.Date ||
        type === Types.IDArray ||
        type === Types.IntArray ||
        type === Types.FloatArray ||
        type === Types.StringArray ||
        type === Types.DateArray ||
        type === Types.File ||
        type === Types.JSON
      ) {
        return type;
      } else {
        const cls = getClass(typeUuid || "");

        if (!cls) {
          return "";
        }
        if (
          type === Types.Enum ||
          type === Types.ValueObject ||
          type === Types.Entity
        ) {
          return cls.name;
        } else if (
          type === Types.EnumArray ||
          type === Types.ValueObjectArray ||
          type === Types.EntityArray
        ) {
          return `${cls.name}[]`;
        }

        return "";
      }
    },
    [getClass]
  );

  return typeName;
}
