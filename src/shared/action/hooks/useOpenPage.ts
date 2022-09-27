import { pagePopupsState } from "../../../plugin-sdk/atoms";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createId } from "../..";
import { useAppViewKey } from "../../../plugin-sdk/contexts/appRoot";
import { useInstanceId } from "../../contexts/instance";
import { IOpenPageAction, OpenPageType } from "../../../plugin-sdk/model/action";

export function useOpenPage() {
  const { device, appUuid, menuUuid } = useParams();
  const dataId = useInstanceId();
  const key = useAppViewKey();
  const setPagePopups = useSetRecoilState(pagePopupsState(key));
  const navigate = useNavigate();

  const open = useCallback((action: IOpenPageAction) => {
    if (action.openType === OpenPageType.RouteTo) {
      navigate(`/app/${device}/${appUuid}/${menuUuid || "no"}/${action.pageId}/${dataId || ""}`)
    } else if (action.openType === OpenPageType.Dialog || action.openType === OpenPageType.Drawer) {
      setPagePopups(pgPops => ([...pgPops, {
        id: createId(),
        ...action,
        dataId
      }]))
    }
  }, [appUuid, dataId, device, menuUuid, navigate, setPagePopups]);

  return open;
}