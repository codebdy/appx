import { parse } from "graphql";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { HEADER_APPX_APPID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "~/consts";
import { AwesomeGraphQLClient, useEndpoint, useToken } from "~/enthooks";
import { EVENT_DATA_POSTED, trigger } from "~/enthooks/events";
import { IGraphqlAction } from "~/plugin-sdk";
import { useAppParams } from "~/plugin-sdk/contexts/app";

const firstOperationDefinition = (ast) => ast.definitions?.[0];

export function useGraphql() {
  const endpoint = useEndpoint();
  const token = useToken();
  const { app } = useAppParams()

  const { t } = useTranslation()
  const doGraphql = useCallback(async (palyload: IGraphqlAction, variables: any) => {
    if (!palyload?.gqlScript) {
      throw new Error(t("Action.GqlScriptEmperty"))
    }

    const ast = parse(palyload.gqlScript);
    const operationNode = firstOperationDefinition(ast);
    const variableNames = operationNode?.variableDefinitions?.map(variableNode => {
      return variableNode.variable?.name?.value
    })

    const gqlVariables = {} as any

    for (const variableName of variableNames || []) {
      gqlVariables[variableName] = variables[variableName]
    }

    if (!endpoint) {
      throw new Error("endpoint is null")
    }

    const headers = {
      [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
      [HEADER_APPX_APPID]: app.id,
    }

    const graphQLClient = new AwesomeGraphQLClient({ endpoint })
    const data = await graphQLClient.request(palyload.gqlScript, gqlVariables, {
      headers: headers
    })

    const affectedEntities = palyload.affectedEntities?.replace("，", ",")?.split(",");

    for (const entityName of affectedEntities || []) {
      trigger(EVENT_DATA_POSTED, { entity: entityName.trim() })
    }
    return data;
  }, [endpoint, token, app])

  return doGraphql;
}