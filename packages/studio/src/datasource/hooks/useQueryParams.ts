import { useMemo } from "react";
import { Schema as JsonSchema } from '@formily/json-schema';
import { Schema, useExpressionScope } from "@formily/react";
import { IDataBindSource } from "../model";
import { parse, OperationTypeNode, print, Kind, visit, ObjectValueNode } from "graphql";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { IFragmentParams } from "./IFragmentParams";
import { useQueryFragmentFromSchema } from "./useQueryFragmentFromSchema";
import { IQueryForm } from "../model/IQueryForm";
import { useConvertQueryFormToGqlNodes } from "./useConvertQueryFormToGqlNodes";
import { IOrderBy } from "../model/IOrderBy";

export interface IQueryParams extends IFragmentParams {
  entityName?: string,
  rootFieldName?: string,
}
const firstOperationDefinition = (ast) => ast.definitions?.[0];
const firstFiledFromOperation = (operationDefinition) => operationDefinition?.selectionSet?.selections?.[0];

//GQL拼接部分欠缺关联跟方法的参数
export function useQueryParams(
  dataBind: IDataBindSource | undefined,
  schema: JsonSchema | undefined,
  queryForm: IQueryForm | undefined,
  orderBys?: IOrderBy[],
  current?: number,
  pageSize?: number,
): IQueryParams {
  const { t } = useTranslation();
  const fragmentFromSchema = useQueryFragmentFromSchema(schema);
  const expScope = useExpressionScope()
  const convertQueryForm = useConvertQueryFormToGqlNodes();
  console.log("哈哈哈啊哈哈", current, pageSize, orderBys)
  const params = useMemo(() => {
    const pms: IQueryParams = {}
    if (dataBind?.expression) {
      try {
        const ast = parse(dataBind?.expression);
        const nodesFromQueryForm = convertQueryForm(queryForm);
        if (!dataBind?.entityName) {
          throw new Error("Can not finde entityName in dataBind");
        }

        const operation = firstOperationDefinition(ast).operation;
        const firstField = firstFiledFromOperation(firstOperationDefinition(ast));

        if (operation !== OperationTypeNode.QUERY) {
          message.error("Can not find query operation");
        }
        pms.rootFieldName = firstField?.name?.value;
        pms.entityName = dataBind?.entityName;

        const shchemaFragmentAst = parse(fragmentFromSchema.gql);

        pms.variables = dataBind?.variables;

        var compiledAST = visit(ast, {
          // @return
          //   undefined: no action
          //   false: skip visiting this node
          //   visitor.BREAK: stop visiting altogether
          //   null: delete this node
          //   any value: replace this node with the returned value
          enter(node, key, parent, path, ancestors) {
            if ((ancestors?.[path.length - 3] as any)?.kind === Kind.OPERATION_DEFINITION &&
              node.kind === Kind.FIELD) {
              //如果根Field 没有where，又有查询表单内容，则添加一个where 节点
              if (nodesFromQueryForm && nodesFromQueryForm.length > 0 &&
                !node.arguments?.find(argument => argument.name?.value === "where")
              ) {
                return {
                  ...node,
                  arguments: [
                    ...node.arguments,
                    {
                      kind: Kind.ARGUMENT,
                      name: {
                        kind: Kind.NAME,
                        value: "where"
                      },
                      value: {
                        kind: Kind.OBJECT,
                        fields: []
                      }
                    },
                  ]
                }
              }
            }

          },
          // @return
          //   undefined: no action
          //   false: no action
          //   visitor.BREAK: stop visiting altogether
          //   null: delete this node
          //   any value: replace this node with the returned value
          leave(node, key, parent, path, ancestors) {
            if ((ancestors?.[path.length - 5] as any)?.kind === Kind.OPERATION_DEFINITION &&
              node.kind === Kind.ARGUMENT &&
              node.name?.value === "where" &&
              nodesFromQueryForm.length > 0
            ) {
              const oldValue = node.value as ObjectValueNode;
              const newFields = [...oldValue.fields, ...nodesFromQueryForm]
              return {
                ...node,
                value: {
                  ...node.value,
                  fields: newFields
                }
              }
            } else if ((ancestors?.[path.length - 6] as any)?.kind === Kind.OPERATION_DEFINITION &&
              node.kind === Kind.FIELD &&
              node.name?.value === "nodes" &&
              (shchemaFragmentAst?.definitions?.[0] as any)?.selectionSet?.selections) {
              return {
                ...node,
                selectionSet: {
                  ...node.selectionSet || {},
                  selections: [
                    ...node.selectionSet.selections || [],
                    ...(shchemaFragmentAst?.definitions?.[0] as any)?.selectionSet?.selections || []
                  ]
                }
              }
            } else if ((ancestors?.[path.length - 3] as any)?.kind === Kind.OPERATION_DEFINITION &&
              node.kind === Kind.FIELD) {
              //arguments 宿主
              const args = node.arguments?.filter(arg => arg?.name?.value !== "limit" && arg?.name?.value !== "offset") || [];
              if (pageSize) {
                args.push({
                  kind: Kind.ARGUMENT,
                  name: {
                    kind: Kind.NAME,
                    value: "limit"
                  },
                  value: {
                    kind: Kind.INT,
                    value: pageSize.toString(),
                  }
                })
              }
              if (current && current > 1) {
                args.push({
                  kind: Kind.ARGUMENT,
                  name: {
                    kind: Kind.NAME,
                    value: "offset"
                  },
                  value: {
                    kind: Kind.INT,
                    value: ((current - 1) * pageSize).toString(),
                  }
                })
              }
              return {
                ...node,
                arguments: args
              }
            }

            if (node.kind === Kind.STRING) {
              const newValue = Schema.shallowCompile(node.value, expScope);
              if (newValue === undefined) {
                return {
                  kind: Kind.NULL
                }
              } else {
                return {
                  ...node,
                  value: newValue
                }
              }
            }
          }
        });
        const gql = print(compiledAST);
        console.log("compiledAST", compiledAST, gql)
        pms.gql = gql;
      } catch (err) {
        console.error(err);
        message.error(t("Query.GraphqlExpressionError") + err?.message)
      }
    }

    return pms;
  }, [convertQueryForm, current, dataBind?.entityName, dataBind?.expression, dataBind?.variables, expScope, fragmentFromSchema.gql, pageSize, queryForm, t]);
  console.log("Query GQL:", params?.gql, params?.variables);
  return params
}