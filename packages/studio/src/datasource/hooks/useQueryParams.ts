import { useCallback, useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode, print, Kind } from "graphql";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { IFragmentParams } from "./IFragmentParams";
import { useQueryFragmentFromSchema } from "./useQueryFragmentFromSchema";
import { IQueryForm } from "../model/IQueryForm";
import { useConvertQueryFormToArgs } from "./useConvertQueryFormToArgs";

export interface IQueryParams extends IFragmentParams {
  entityName?: string,
  rootFieldName?: string,
}

//GQL拼接部分还是很不完善
export function useQueryParams(dataBind: IDataBindSource | undefined, schema: Schema | undefined, queryForm?: IQueryForm): IQueryParams {
  const { t } = useTranslation();
  const firstOperationDefinition = useCallback((ast) => ast.definitions?.[0], []);
  const rootField = useCallback((ast) => ast.definitions?.[0]?.selectionSet?.selections[0], []);
  const firstFiledFromOperation = useCallback((operationDefinition) => operationDefinition?.selectionSet?.selections?.[0], []);
  //const firstFieldValueNameFromOperation = (operationDefinition) => operationDefinition?.selectionSet?.selections?.[0]?.name?.value;
  const fragmentFromSchema = useQueryFragmentFromSchema(schema);
  const convertQueryForm = useConvertQueryFormToArgs();

  console.log("呵呵呵", convertQueryForm(queryForm));

  const params = useMemo(() => {
    const pms: IQueryParams = {}
    if (dataBind?.expression) {
      try {
        const ast = parse(dataBind?.expression);
        if (!dataBind?.entityName) {
          throw new Error("Can not finde entityName in dataBind");
        }

        const operation = firstOperationDefinition(ast).operation;
        const firstField = firstFiledFromOperation(firstOperationDefinition(ast));
        console.log("哈哈哈", firstField, firstField?.name?.value, firstField.arguments)
        const queryFormArgs = convertQueryForm(queryForm);
        const whereArg = firstField.arguments?.find(arg=>arg.name?.value === "where");

        // if(whereArg){
        //   const newWhere =  {
        //     kind: Kind.ARGUMENT,
        //     name: {
        //       Kind:Kind.NAME,
        //       value: "where",
        //     },
        //     value: ValueNode;
        //   }
        // }

        if (operation !== OperationTypeNode.QUERY) {
          message.error("Can not find query operation");
        }
        pms.rootFieldName = firstField?.name?.value;
        pms.entityName = dataBind?.entityName;

        const shchemaFragmentAst = parse(fragmentFromSchema.gql);
        const firstNode = rootField(ast);
        if (firstNode?.selectionSet?.selections) {
          firstNode.selectionSet.selections = [
            ...firstNode.selectionSet.selections,
            ...(shchemaFragmentAst?.definitions?.[0] as any)?.selectionSet?.selections || {},
          ]
        }

        pms.variables = { ...fragmentFromSchema.variables, ...dataBind?.variables || {} }

        const gql = print(ast);
        pms.gql = gql;
      } catch (err) {
        console.error(err);
        message.error(t("Query.GraphqlExpressionError") + err?.message)
      }
    }

    return pms;
  }, [dataBind?.entityName, dataBind?.expression, dataBind?.variables, firstFiledFromOperation, firstOperationDefinition, fragmentFromSchema.gql, fragmentFromSchema.variables, rootField, t]);
  //console.log("Query GQL:", params?.gql, params?.variables);
  return params
}