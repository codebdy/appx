import { pagePopupsState } from "../../../AppRunner/recoil/atoms";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createId } from "../..";
import { useAppViewKey } from "../../AppRoot/context";
import { useInstanceId } from "../../contexts/instance";
import { IOpenPageAction, OpenPageType } from "../model";

export function useOpenPage() {
  const { device, appUuid, menuUuid } = useParams();
  const dataId = useInstanceId();
  const key = useAppViewKey();
  const setPagePopups = useSetRecoilState(pagePopupsState(key));
  const navigate = useNavigate();
  
  const open = useCallback((action: IOpenPageAction) => {
    if (action.openType === OpenPageType.RouteTo) {
      console.log(`menuUuid:${menuUuid}, pageId:${action.pageId}, dataId:${dataId}`)
      navigate(`/app/${device}/${appUuid}/${menuUuid||"no"}/${action.pageId}/${dataId}`)
    }else if(action.openType === OpenPageType.Dialog || action.openType === OpenPageType.Drawer){
      setPagePopups(pgPops =>([...pgPops, {
        id: createId(),
        ...action
      }]))
    }
  }, [appUuid, dataId, device, menuUuid, navigate, setPagePopups]);

  return open;
}