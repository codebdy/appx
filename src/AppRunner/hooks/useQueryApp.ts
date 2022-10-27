import { gql } from "../../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_ID } from "../../consts";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { IApp } from "../../model";
import { ID } from "~/shared";

const appGql = gql`
query ($id: ID!) {
  oneApp(where: {id: {_eq: $id}}) {
    id
    uuid
    title
    imageUrl
    published
    partsOfMenu {
      id
      device
      schemaJson
    }
    partsOfLangLocal {
      id
      name
      schemaJson
    }
    partsOfAppConfig {
      id
      schemaJson
    }
    partsOfUserConfig {
      id
      device
      schemaJson
    }
    partsOfAppDeviceConfig {
      id
      device
      schemaJson
    }
    plugins {
      id
      url
      title
      pluginId
      type
      description
      version
    }
  }
}
`

export function useQueryApp(id: ID) {
  const params = useMemo(() => ({
    appId: id || SYSTEM_APP_ID
  }), [id])
  
  const { data, error, loading } = useQueryOne<IApp>(
    {
      gql: appGql,
      params,
      depEntityNames: ["App"],
    }

  )

  return { app: data?.oneApp, error, loading }
}