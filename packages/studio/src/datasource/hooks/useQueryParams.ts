import { useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode, visit, print } from "graphql";
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
      const ast = parse(dataBindSource.expression);
      console.log("danzm", ast);
      const operation = firstOperationDefinition(ast).operation;
      if (operation !== OperationTypeNode.QUERY) {
        message.error("Can not find query operation");
      }
      params.rootFieldName = firstFieldValueNameFromOperation(firstOperationDefinition(ast));

      const fragmenAst = visit(firstOperationDefinition(ast)?.selectionSet?.selections?.[0]?.selectionSet, {
        enter(node, key, parent, path, ancestors) {
          // do some work
        },
        leave(node, key, parent, path, ancestors) {
          // do some more work
        }
      });

      console.log(`fragment RootFragment on ${params.rootFieldName}`, print(fragmenAst))
    } catch (err) {
      console.error(err);
      message.error(t("Query.GraphqlExpressionError") + err?.message)
    }
  }

  return params
}