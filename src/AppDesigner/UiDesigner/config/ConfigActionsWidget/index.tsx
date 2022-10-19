import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { useShowError } from '~/hooks/useShowError'
import { useTranslation } from 'react-i18next'
import { useAppParams, useAppViewKey } from '@rxdrag/plugin-sdk/contexts/appRoot'
import { useRecoilState, useRecoilValue } from 'recoil'
import { deviceConfigChangedState, deviceConfigState } from '../../recoil/atom'
import { useUpsertAppDeviceConfig } from '~/hooks/useUpsertAppDeviceConfig'

export const ConfigActionsWidget = observer(() => {
  const { device } = useAppParams();
  const key = useAppViewKey();
  const [changed, setChanged] = useRecoilState(deviceConfigChangedState(key));
  const appDeviceConfig = useRecoilValue(deviceConfigState(key));
  const { t } = useTranslation();

  const [upsert, { loading, error }] = useUpsertAppDeviceConfig(
    {
      onCompleted: () => {
        message.success(t("OperateSuccess"));
        setChanged(false);
      }
    }
  );

  useShowError(error);

  const handleSave = useCallback(() => {
    upsert({
      ...appDeviceConfig,
      device,
      schemaJson: {
        ...appDeviceConfig?.schemaJson || {},
        entryId: appDeviceConfig?.schemaJson?.entryId,
      }
    })
  }, [appDeviceConfig, device, upsert])

  return (
    <Button
      type="primary"
      loading={loading}
      disabled={!changed}
      onClick={handleSave}
    >
      <TextWidget>Save</TextWidget>
    </Button>
  )
})
