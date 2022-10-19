import { useParentForm } from "@formily/react"
import { useCallback, useMemo } from "react";
import { isObjectField } from "@formily/core";
import { toJS } from "@formily/reactive";
import { useProTableParams } from "@rxdrag/plugin-sdk";

export function useTableSearch() {
  const params = useProTableParams();
  const form = useParentForm();
  const objectField = useMemo(() => (isObjectField(form) && form), [form]);

  const submit = useCallback(() => {
    if(!isObjectField(form)){
      console.error("Can not find ObjectField")
    }
    if (objectField.validate) {
      objectField?.validate();
    }
    params.queryForm = toJS(objectField?.value);
    params.current = 1;
  }, [form, objectField, params])

  return submit;
}