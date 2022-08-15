import React, { useCallback, useState } from "react";
import { ArgMeta, MethodMeta, MethodImplementType, MethodOperateType } from "../meta/MethodMeta";
import { Type } from "../meta/Type";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeMethod } from "../hooks/useChangeMethod";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";

export const MethodPanel = (props: { method: MethodMeta; cls: ClassMeta }) => {
  const { method, cls } = props;
  const [nameError, setNameError] = useState<string>();
  const serviceId = useSelectedAppUuid();
  const changeMethod = useChangeMethod(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);

  const handleStringChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<{ value: string }>) => {
      changeMethod(
        {
          ...method,
          [prop]: event.target.value.trim(),
        },
        cls
      );
    },
    [changeMethod, method, cls]
  );

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = useCallback(
    (type: Type) => {
      changeMethod(
        {
          ...method,
          type,
          typeUuid: undefined,
          typeLabel: getTypeLabel(type),
        },
        cls
      );
    },
    [changeMethod, method, getTypeLabel, cls]
  );

  const handleValueObjectChange = useCallback(
    (uuid: string) => {
      changeMethod(
        {
          ...method,
          typeUuid: uuid,
          typeLabel: getTypeLabel(method.type, uuid),
        },
        cls
      );
    },
    [changeMethod, method, getTypeLabel, cls]
  );

  const handleArgsChange = useCallback(
    (args: ArgMeta[]) => {
      changeMethod(
        {
          ...method,
          args: args.map((arg) => ({
            ...arg,
            typeLabel: getTypeLabel(arg.type, arg.typeUuid),
          })),
        },
        cls
      );
    },
    [changeMethod, cls, getTypeLabel, method]
  );

  const handleMethodTypeChange = useCallback(
    (event: any) => {
      changeMethod(
        {
          ...method,
          implementType: event.target.value as MethodImplementType,
        },
        cls
      );
    },
    [changeMethod, cls, method]
  );

  const handleMethodOperateChange = useCallback(
    (event: any) => {
      changeMethod(
        {
          ...method,
          operateType: event.target.value as MethodOperateType,
        },
        cls
      );
    },
    [changeMethod, cls, method]
  );

  const hangdleMethodImplementsChange = useCallback(
    (value: any) => {
      changeMethod(
        {
          ...method,
          methodImplements: value,
        },
        cls
      );
    },
    [changeMethod, cls, method]
  );

  return (
    <div>MethodPanel</div>
  );
};
