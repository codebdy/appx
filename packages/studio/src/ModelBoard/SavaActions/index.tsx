import { Space, Button, message } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getLocalMessage } from "../../locales/getLocalMessage";
import SyncButton from "./SyncButton";
import { changedState, metaState } from "../recoil/atoms";
import { useSelectedAppUuid } from '../hooks/useSelectedAppUuid';
import { EntityNameMeta, Meta } from "../meta/Meta";
import { useValidate } from "../hooks/useValidate";
import { usePostOne } from "../../enthooks/hooks/usePostOne";
import { useShowError } from "../../hooks/useShowError";
import { useGetMeta } from "../hooks/useGetMeta";


const SavaActions = memo(() => {
  const appUuid = useSelectedAppUuid();
  const [changed, setChanged] = useRecoilState(changedState(appUuid));
  const setMeta = useSetRecoilState(metaState(appUuid));
  const getMeta = useGetMeta(appUuid);
  
  const validate = useValidate(appUuid);
  const [excuteSave, { loading, error }] = usePostOne<Meta, any>(EntityNameMeta, {
    onCompleted(data: Meta) {
      message.success(getLocalMessage("OperateSuccess"));
      setChanged(false);
      setMeta(data);
    },
  });

  useShowError(error);
  
  const handleSave = useCallback(() => {
    if (!validate()) {
      return;
    }
    const data =getMeta()
    excuteSave(data);
  }, [excuteSave, getMeta, validate]);


  return (
    <Space>
      <Button
        type="primary"
        disabled={!changed}
        loading={loading}
        onClick={handleSave}
      >
        {getLocalMessage("save")}
      </Button>
      <SyncButton />
    </Space>
  )
})

export default SavaActions;