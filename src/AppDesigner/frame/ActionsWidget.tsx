import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { transformToSchema } from '../transformer'
import { useShowError } from '../../hooks/useShowError'
import { useTranslation } from 'react-i18next'
import { useSelectedFrameId } from '../hooks/useSelectedFrameId'
import { useUpsertPageFrame } from '../hooks/useUpsertPageFrame'

export const FrameActionsWidget = observer(() => {
  const designer = useDesigner();
  const frameId = useSelectedFrameId();
  const { t } = useTranslation();
  const [upsert, { loading, error }] = useUpsertPageFrame({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    upsert({ id: frameId, schemaJson: transformToSchema(designer.getCurrentTree()) });
  }, [designer, frameId, upsert])

  return (
    <Button
      type="primary"
      disabled={!frameId}
      loading={loading}
      onClick={handleSave}
    >
      <TextWidget>Save</TextWidget>
    </Button>
  )
})
