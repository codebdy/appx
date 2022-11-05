import { useCallback } from "react";
import { Field, GeneralField, isField } from "@formily/core";
import { toJS } from "@formily/reactive";
import { AssociationType } from "~/datasource/model/IFieldSource";
import { CONST_ID } from "~/AppDesigner/AppUml/meta";

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


const getRecordChildrenFields = (index: number, field: GeneralField) => {
  const children: IFieldInfo[] = []
  const address = field.address.toString() + "." + index + ".";

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
    if (isField(field)) {
      if (field?.componentProps?.associationType === AssociationType.HasMany) {
        if (field.value) {
          const arrayValue = toJS(field.value);
          if (Array.isArray(arrayValue)) {
            for (let i = 0; i < arrayValue.length; i++) {
              const children = getRecordChildrenFields(i, field);
              for (const child of children) {
                recursionField(child, arrayValue[i])
              }
            }
          }
          value[name] = { sync: arrayValue };

        } else if (value[CONST_ID]) {
          value[name] = { sync: [] };
        }

        return;
      } else if (field?.componentProps?.associationType === AssociationType.HasOne) {
        if (field.value) {
          value[name] = { sync: toJS(field.value) };
        } else if (value[CONST_ID]) {
          value[name] = { clear: true }
        }
      } else if (field.value != undefined) {
        value[name] = toJS(field.value);
      }
    }
    const currentValue = isField(field) ? value[name] : value;
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
    return toJS(value)?.[name];
  }, [recursionField])

  return convert;
}