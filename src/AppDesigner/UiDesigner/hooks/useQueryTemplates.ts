import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IPage, ITemplateInfo, TemplateType } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

const templatesGql = gql`
query ($appId:ID!, $device:String!, $templateType:String!){
  templateInfos(where:{
    _and:[
      {
        app:{
          id:{
            _eq:$appId
          }
        }
      },
      {
        device:{
          _eq:$device
        }
      },
      {
        templateType:{
          _eq:$templateType
        }
      }
    ]
  },
  orderBy:{
    id:asc
  }
 ){
    nodes{
      id
      device
      name
      templateType
      categoryType
      schemaJson
      imageUrl
    }
  }
}
`

export function useQueryTemplates(templateType: TemplateType) {
  const appParams = useDesignerParams();

  const args = useMemo(() => {
    return {
      gql: templatesGql,
      params: { device: appParams.device, appId: appParams.app.id, templateType },
      depEntityNames: ["TemplateInfo"]
    }
  }, [appParams, templateType])

  const { data, error, loading } = useQuery<ITemplateInfo>(args)

  return { templates: data?.templateInfos?.nodes, error, loading }
}