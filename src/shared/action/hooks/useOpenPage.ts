import { pagePopupsState } from "@rxdrag/plugin-sdk/atoms";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { createId } from "../..";
import { useInstanceId } from "@rxdrag/plugin-sdk/contexts/instance";
import { IOpenPageAction, OpenPageType } from "@rxdrag/plugin-sdk/model/action";
import { SYSTEM_APP_ID } from "~/consts";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { useAppViewKey } from "~/plugin-sdk/contexts/app";

export function useOpenPage() {
  const { device = Device.PC, appId = SYSTEM_APP_ID, menuUuid } = useParams();
  const dataId = useInstanceId();
  const key = useAppViewKey();
  const setPagePopups = useSetRecoilState(pagePopupsState(key));
  const navigate = useNavigate();

  const open = useCallback((action: IOpenPageAction) => {
    if (action.openType === OpenPageType.RouteTo) {
      console.log("哈哈哈", action.pageUuid)
      navigate(`/${device}/${appId}/${menuUuid || "no"}/${action.pageUuid}/${dataId || ""}`)
    } else if (action.openType === OpenPageType.Dialog || action.openType === OpenPageType.Drawer) {
      setPagePopups(pgPops => ([...pgPops, {
        id: createId(),
        ...action,
        dataId
      }]))
    }
  }, [appId, dataId, device, menuUuid, navigate, setPagePopups]);

  return open;
}