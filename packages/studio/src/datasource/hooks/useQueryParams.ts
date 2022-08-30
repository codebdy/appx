import { useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode, print } from "graphql";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { IFragmentParams } from "./IFragmentParams";
import { useQueryFragmentFromSchema } from "./useQueryFragmentFromSchema";

export interface IQueryParams extends IFragmentParams {
  entityName?: string,
  rootFieldName?: string,
}

//GQL拼接部分还是很不完善
export function useQueryParams(dataBind?: IDataBindSource, schema?: Schema): IQueryParams {
  const { t } = useTranslation();
  const firstOperationDefinition = (ast) => ast.definitions?.[0];
  const rootField = (ast) => ast.definitions?.[0]?.selectionSet?.selections[0];
  const firstFieldValueNameFromOperation = (operationDefinition) => operationDefinition?.selectionSet?.selections?.[0]?.name?.value;
  const fragmentFromSchema = useQueryFragmentFromSchema(schema);
  
  const params = useMemo(() => {
    const pms: IQueryParams = {}
    if (dataBind?.expression) {
      try {
        const ast = parse(dataBind?.expression);
        if (!dataBind?.entityName) {
          throw new Error("Can not finde entityName in dataBind");
        }

        const operation = firstOperationDefinition(ast).operation;
        if (operation !== OperationTypeNode.QUERY) {
          message.error("Can not find query operation");
        }
        pms.rootFieldName = firstFieldValueNameFromOperation(firstOperationDefinition(ast));
        pms.entityName = dataBind?.entityName;

        const shchemaFragmentAst = parse(fragmentFromSchema.gql);
        const firstNode = rootField(ast);
        if (firstNode?.selectionSet?.selections) {
          firstNode.selectionSet.selections = [
            ...firstNode.selectionSet.selections,
            ...(shchemaFragmentAst?.definitions?.[0] as any)?.selectionSet?.selections||{},
          ]
        }

        pms.variables = { ...fragmentFromSchema.variables, ...dataBind?.variables||{} }

        const gql = print(ast);
        pms.gql = gql;
      } catch (err) {
        console.error(err);
        message.error(t("Query.GraphqlExpressionError") + err?.message)
      }
    }

    return pms;
  }, [dataBind?.entityName, dataBind?.expression, dataBind?.variables, fragmentFromSchema.gql, fragmentFromSchema.variables, t]);
  console.log("Query GQL:", params?.gql, params?.variables);
  return params
}