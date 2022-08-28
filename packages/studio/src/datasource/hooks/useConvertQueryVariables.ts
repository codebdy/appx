import { useCallback } from "react";
import { useParams } from "react-router-dom";

export function useConvertQueryVariables(){
  const {dataId} = useParams();
  const convertQueryVariables = useCallback((variables?:any)=>{

    if(!variables){
      return variables;
    }

    console.log("呵呵二号", variables)

    for(const key of Object.keys(variables)){
      if(variables[key] === "$dataId"){
        variables[key] = dataId;
      }
    }

    return variables;
  }, [dataId])

  return convertQueryVariables;
}