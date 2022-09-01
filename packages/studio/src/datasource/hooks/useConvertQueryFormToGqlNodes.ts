import { isArr, isObj, isStr } from "@formily/shared";
import { BooleanValueNode, EnumValueNode, FloatValueNode, IntValueNode, Kind, ListValueNode, NullValueNode, ObjectFieldNode, ObjectValueNode, StringValueNode } from "graphql";
import { useCallback } from "react";
import { IRangeValue } from "../../components/pc/RangePicker";
import { IQueryForm } from "../model/IQueryForm";

const createObjectValueNode = (value: any): IntValueNode
  | FloatValueNode
  | StringValueNode
  | BooleanValueNode
  | NullValueNode
  | EnumValueNode
  | ListValueNode
  | ObjectValueNode => {
  if (value === undefined) {
    return {
      kind: Kind.NULL
    }
  }
}

const createObjectFieldNode = (name: string, operator: string, value: any): ObjectFieldNode => {
  return {
    kind: Kind.OBJECT_FIELD,
    name: {
      kind: Kind.NAME,
      value: name,
    },
    value: {
      kind: Kind.OBJECT,
      fields: [
        {
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: operator
          },
          value: createObjectValueNode(value)
        }
      ]

    }
  }
}
export function useConvertQueryFormToGqlNodes() {
  const convert = useCallback((queryForm?: IQueryForm): ListValueNode | ObjectFieldNode | undefined => {
    if (!queryForm) {
      return undefined;
    }

    const args: ObjectValueNode[] = [];
    for (const key of Object.keys(queryForm)) {
      const value = queryForm[key];
      if (isObj(value)) {
        const anyValue = value as any;
        if (anyValue?.start || anyValue?.end) {
          const rangeValue = value as IRangeValue
          if (rangeValue?.start) {
            const gtOp = rangeValue.startWithEqual ? "_gte" : "_gt";
            args.push(
              {
                [key]: {
                  [gtOp]: value
                }
              }
            )
          }
          if (rangeValue?.end) {
            const ltOp = rangeValue.startWithEqual ? "_lte" : "_lt";
            args.push(
              {
                [key]: {
                  [ltOp]: value
                }
              }
            )
          }
        } else if (anyValue.isLike) {
          args.push(
            {
              [key]: {
                _like: `%${anyValue?.keyword}%`
              }
            }
          )
        } else {
          args.push(
            {
              [key]: {
                _eq: value
              }
            }
          )
        }
      } else if (isArr(value)) {
        args.push(
          {
            [key]: {
              id: {
                _in: value?.map(v => v?.id)
              }
            }
          }
        )
      } else if (isStr(value) && value.trim()) {
        args.push(
          {
            [key]: {
              _eq: value.trim()
            }
          }
        )
      } else if (value) {
        args.push(
          {
            [key]: {
              _eq: value
            }
          }
        )
      }
    }
    return args;
  }, []);

  return convert;
}