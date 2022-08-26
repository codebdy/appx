import { useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode, visit, print } from "graphql";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { IFragmentParams } from "./IFragmentParams";
import { useQueryFragmentFromSchema } from "./useQueryFragmentFromSchema";

export interface IQueryParams extends IFragmentParams {
  rootFieldName?: string,
}

export function useQueryParams(dataBindSource?: IDataBindSource, schema?: Schema): IQueryParams {
  const { t } = useTranslation();
  const firstOperationDefinition = (ast) => ast.definitions?.[0];
  const firstFieldValueNameFromOperation = (operationDefinition) => operationDefinition?.selectionSet?.selections?.[0]?.name?.value;
  const fragmentFromSchema = useQueryFragmentFromSchema(schema);
  const params = useMemo(() => {
    const parms:IQueryParams= {}
    if (dataBindSource.expression) {
      try {
        const ast = parse(dataBindSource.expression);
        console.log("gql ast", ast);
        const operation = firstOperationDefinition(ast).operation;
        if (operation !== OperationTypeNode.QUERY) {
          message.error("Can not find query operation");
        }
        parms.rootFieldName = firstFieldValueNameFromOperation(firstOperationDefinition(ast));
  
        const fragmenAst = visit(firstOperationDefinition(ast)?.selectionSet?.selections?.[0]?.selectionSet, {
          enter(node, key, parent, path, ancestors) {
            // do some work
          },
          leave(node, key, parent, path, ancestors) {
            // do some more work
          }
        });
  
        const rootFragment: IFragmentParams = {
          gql: `fragment RootFragment on ${parms.rootFieldName} ${print(fragmenAst)}`,
          variables: dataBindSource.variables,
        }
  
        parms.variables = { ...fragmentFromSchema.variables || {}, ...rootFragment.variables || {} }
  
        const gql = `
        fragment SchemaFragment on ${parms.rootFieldName} ${rootFragment.gql}
        ${fragmentFromSchema.gql}
        query{
          ${parms.rootFieldName}{
            ...RootFragment
            ...SchemaFragment
          }
        }
        `;
        parms.gql = gql;
      } catch (err) {
        console.error(err);
        message.error(t("Query.GraphqlExpressionError") + err?.message)
      }
    }
  
    return parms;
  }, [dataBindSource.expression, dataBindSource.variables, fragmentFromSchema.gql, fragmentFromSchema.variables, t]);

  return params
}