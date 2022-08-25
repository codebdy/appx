import { useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode } from "graphql";
import { message } from "antd";
import { useTranslation } from "react-i18next";

export interface IQueryParams {
  gql?: string,
  variables?: any,
  rootFieldName?: string,
}

export function useQueryParams(dataBindSource?: IDataBindSource, schema?: Schema): IQueryParams {
  const params: IQueryParams = useMemo(() => ({}), []);
  const { t } = useTranslation();
  const firstOperationDefinition = (ast) => ast.definitions?.[0];
  const firstFieldValueNameFromOperation = (operationDefinition) => operationDefinition?.selectionSet?.selections?.[0]?.name?.value;

  if (dataBindSource.expression) {
    try {
      const paresedExpression = parse(dataBindSource.expression);
      console.log("danzm", paresedExpression);
      const operation = firstOperationDefinition(paresedExpression).operation;
      if (operation !== OperationTypeNode.QUERY) {
        message.error("Can not find query operation");
      }
      params.rootFieldName = firstFieldValueNameFromOperation(firstOperationDefinition(paresedExpression));
    } catch (err) {
      console.error(err);
      message.error(t("Query.GraphqlExpressionError") + err?.message)
    }
  }

  return params
}