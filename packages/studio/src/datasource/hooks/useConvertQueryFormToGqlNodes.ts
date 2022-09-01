import { isArr, isBool, isNum, isObj, isStr } from "@formily/shared";
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

  if (isStr(value)) {
    return {
      kind: Kind.STRING,
      value
    }
  }

  if (isArr(value)) {
    return {
      kind: Kind.LIST,
      values: value.map(subValue => createObjectValueNode(subValue))
    }
  }

  if (isBool(value)) {
    return {
      kind: Kind.BOOLEAN,
      value
    }
  }

  if (isNum(value)) {
    return {
      kind: Kind.INT,
      value: value as any,
    }
  }

  if ((value.toString().indexOf(".") !== -1)) {
    return {
      kind: Kind.FLOAT,
      value: value as any,
    }
  }

  if (isObj(value)) {
    return {
      kind: Kind.OBJECT,
      fields: Object.keys(value).map((key) => {
        return {
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: key
          },
          value: createObjectValueNode(value[key]),
        }
      })
    }
  }

  throw new Error("can not process type value:" + value)
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
  const convert = useCallback((queryForm?: IQueryForm): ObjectFieldNode[]=> {
    if (!queryForm) {
      return [];
    }
    const args: ObjectFieldNode[] = [];
    for (const key of Object.keys(queryForm)) {
      const value = queryForm[key];
      if (isObj(value)) {
        const anyValue = value as any;
        if (anyValue?.start || anyValue?.end) {
          const rangeValue = value as IRangeValue
          if (rangeValue?.start) {
            const gtOp = rangeValue.startWithEqual ? "_gte" : "_gt";
            args.push(createObjectFieldNode(key, gtOp, value));
          }
          if (rangeValue?.end) {
            const ltOp = rangeValue.startWithEqual ? "_lte" : "_lt";
            args.push(createObjectFieldNode(key, ltOp, value));
          }
        } else if (anyValue.isLike) {
          args.push(createObjectFieldNode(key, "_like", value));
        } else {
          args.push(createObjectFieldNode(key, "_eq", value));
        }
      } else if (isArr(value)) {
        args.push(createObjectFieldNode(key, "_in", value?.map(v => v?.id)));
      } else if (isStr(value) && value.trim()) {
        args.push(createObjectFieldNode(key, "_eq", value.trim()));
      } else if (value) {
        args.push(createObjectFieldNode(key, "_eq", value));
      }
    }
    return args;
  }, []);

  return convert;
}