import { useCallback } from "react";
import { IGraphqlAction } from "~/plugin-sdk";

export function useGraphql(){
  const doGraphql = useCallback(async (palyload: IGraphqlAction, variables: any)=>{
    console.log("进入gql 动作", palyload, variables)
  }, [])

  return doGraphql;
}