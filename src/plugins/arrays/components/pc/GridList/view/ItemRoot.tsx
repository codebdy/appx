import { Field } from "@formily/core";
import { useField } from "@formily/react";
import { observer } from "@formily/reactive-react"
import React from "react"
import { InstanceContext } from "~/plugin-sdk";
import { useArrayParams } from "~/plugin-sdk/contexts/array";

export const ItemRoot = observer((
  props: {
    instance?: any,
    children?: React.ReactNode,
  }
) => {
  const { instance, children } = props;
  const field = useField();
  const { dataBind } = useArrayParams()

  return (
    <InstanceContext.Provider
      value={{
        field: field as Field,
        instance,
        entityName: dataBind?.entityName,
      }}
    >
      {children}
    </InstanceContext.Provider>
  )
})