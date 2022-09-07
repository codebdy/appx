import { useCallback } from "react";
import { Field, GeneralField, isField } from "@formily/core";
import { toJS } from "@formily/reactive";

interface IFieldInfo {
  name: string,
  field: GeneralField
}

const getChildrenFields = (field: GeneralField) => {
  const children: IFieldInfo[] = []
  const address = field.address.toString() + ".";
  for (const key of Object.keys(field.form.fields)) {
    if (key.startsWith(address)) {
      const fieldName = key.substring(address.length)
      if (fieldName.split(".").length === 1) {
        children.push({
          name: fieldName,
          field: field.form.fields[key]
        })
      }
    }
  }
  return children
}

export function useExtractFieldInput() {

  const recursionField = useCallback((fieldInfo: IFieldInfo, value: any) => {
    const { name, field } = fieldInfo;
    if (isField(field) && value) {
      console.log("呵呵呵呵呵呵", field)
      value[name] = toJS(field.value);
    }
    const currentValue = isField(field) ? field.value : value;
    const children = getChildrenFields(field);
    for (const child of children) {
      recursionField(child, currentValue)
    }

  }, [])

  const convert = useCallback((field: Field) => {
    const value = {};
    const name = field.address.toString().split(".")[field.address.length - 1];
    recursionField(
      {
        name: name,
        field
      },
      value
    )
    console.log("呵呵呵", field.address.toString(), toJS(value)?.[name])
    return toJS(value)?.[name];
  }, [recursionField])

  return convert;
}