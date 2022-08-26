import { useCallback } from "react";
import { ActionType, IAppxAction, IOpenPageAction, OpenPageType } from "../model";
import { useInstanceId } from "../../contexts/instance";
import { useNavigate, useParams } from "react-router-dom";

export function useDoOneAction() {
  const { device, appUuid, menuUuid } = useParams();
  const dataId = useInstanceId();
  const navigate = useNavigate();
  const doAction = useCallback((action: IAppxAction) => {
    return new Promise((resolve, reject) => {
      if(action.actionType === ActionType.OpenPage){
        const payload = action.payload as IOpenPageAction;
        if(payload.openType === OpenPageType.RouteTo){
          navigate(`/app/${device}/${appUuid}/${menuUuid}/${payload.pageId}/${dataId}`)          
        }
        resolve(undefined);
      }
      
    })
  }, [appUuid, dataId, device, menuUuid, navigate])

  return doAction;
}