import { useCallback } from "react";
import { Field, GeneralField, isField, isObjectField } from "@formily/core";
import { toJS } from "@formily/reactive";

interface IFieldInfo {
  name: string,
  field: GeneralField
}

const getChildrenFields = (field: GeneralField) => {
  const children: IFieldInfo[] = []
  const path = field.path.toString() + ".";
  for (const key of Object.keys(field.form.fields)) {
    if (key.startsWith(path)) {
      const fieldName = key.substring(path.length)
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

  const recursionFields = useCallback((fieldInfo: IFieldInfo, value: any) => {
    const { name, field } = fieldInfo;
    if (isField(field) && value) {
      value[name] = toJS(field.value);
    }
    const currentValue = isField(field) ? field.value : value;
    const children = getChildrenFields(field);

    for (const child of children) {
      recursionFields(child, currentValue)
    }

  }, [])

  const convert = useCallback((field: Field) => {

    if (isObjectField(field)) {
      //field
    }
    const value = {};
    const name = field.path.toString().split(".")[field.path.length - 1];
    recursionFields(
      {
        name: name,
        field
      },
      value
    )
    console.log("呵呵呵", field.path.toString(), toJS(value)?.[name])
    return toJS(value)?.[name];
  }, [recursionFields])

  return convert;
}