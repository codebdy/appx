import { useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode, print } from "graphql";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { IFragmentParams } from "./IFragmentParams";
import { useQueryFragmentFromSchema } from "./useQueryFragmentFromSchema";
import { useConvertQueryVariables } from "./useConvertQueryVariables";

export interface IQueryParams extends IFragmentParams {
  entityName?: string,
  rootFieldName?: string,
}

//GQL拼接部分还是很不完善
export function useQueryParams(dataBindSource?: IDataBindSource, schema?: Schema): IQueryParams {
  const { t } = useTranslation();
  const convertQueryVariables = useConvertQueryVariables();
  const firstOperationDefinition = (ast) => ast.definitions?.[0];
  const rootField = (ast) => ast.definitions?.[0]?.selectionSet?.selections[0];
  const firstFieldValueNameFromOperation = (operationDefinition) => operationDefinition?.selectionSet?.selections?.[0]?.name?.value;
  const fragmentFromSchema = useQueryFragmentFromSchema(schema);
  const params = useMemo(() => {
    const pms: IQueryParams = {}
    if (dataBindSource?.expression) {
      try {
        const ast = parse(dataBindSource?.expression);
        if (!dataBindSource?.entityName) {
          throw new Error("Can not finde entityName in dataBindSource");
        }

        const operation = firstOperationDefinition(ast).operation;
        if (operation !== OperationTypeNode.QUERY) {
          message.error("Can not find query operation");
        }
        pms.rootFieldName = firstFieldValueNameFromOperation(firstOperationDefinition(ast));
        pms.entityName = dataBindSource?.entityName;

        const shchemaFragmentAst = parse(fragmentFromSchema.gql);

        const firstNode = rootField(ast);
        if (firstNode?.selectionSet?.selections) {
          firstNode.selectionSet.selections = [
            ...firstNode.selectionSet.selections,
            ...(shchemaFragmentAst?.definitions?.[0] as any)?.selectionSet?.selections,
          ]
        }

        pms.variables = { ...fragmentFromSchema.variables, ...dataBindSource?.variables||{} }

        const gql = print(ast);
        pms.gql = gql;
      } catch (err) {
        console.error(err);
        message.error(t("Query.GraphqlExpressionError") + err?.message)
      }
    }

    pms && (pms.variables = convertQueryVariables(pms.variables));
    return pms;
  }, [convertQueryVariables, dataBindSource?.entityName, dataBindSource?.expression, dataBindSource?.variables, fragmentFromSchema.gql, fragmentFromSchema.variables, t]);
  console.log("Query GQL:", params?.gql, params?.variables);
  return params
}