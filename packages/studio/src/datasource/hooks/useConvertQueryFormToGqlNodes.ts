import { isArr, isObj, isStr } from "@formily/shared";
import { ObjectFieldNode } from "graphql";
import { useCallback } from "react";
import { IRangeValue } from "../../components/pc/RangePicker";
import { IQueryForm } from "../model/IQueryForm";
import { createObjectFieldNode } from "./createObjectFieldNode";

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