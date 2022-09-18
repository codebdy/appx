import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { useTranslation } from 'react-i18next'
import { transformToSchema } from '../AppDesigner/transformer'
import { useShowError } from '../hooks/useShowError'
import { useUpsertTemplate } from './hooks/useUpsertTemplate'
import { ID } from '../shared'

export const ActionsWidget = observer((props: {
  templateId?: ID,
}) => {
  const { templateId } = props;
  const designer = useDesigner();
  const { t } = useTranslation();
  const [update, { loading, error }] = useUpsertTemplate({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    update({ id: templateId, schemaJson: transformToSchema(designer.getCurrentTree()) });
  }, [designer, templateId, update])

  return (
    <Button
      type="primary"
      disabled={!templateId}
      loading={loading}
      onClick={handleSave}
    >
      <TextWidget>Save</TextWidget>
    </Button>
  )
})