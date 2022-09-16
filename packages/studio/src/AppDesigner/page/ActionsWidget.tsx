import React, { useCallback } from 'react'
import { Button, message } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { useUpdatePage } from '../../hooks/useUpdatePage'
import { useSelectedPageId } from '../hooks/useSelectedPageId'
import { transformToSchema } from '../transformer'
import { useShowError } from '../../hooks/useShowError'
import { useTranslation } from 'react-i18next'

export const ActionsWidget = observer(() => {
  const designer = useDesigner();
  const pageId = useSelectedPageId();
  const { t } = useTranslation();
  const [update, { loading, error }] = useUpdatePage({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    update({ id: pageId, schemaJson: transformToSchema(designer.getCurrentTree()) });
  }, [designer, pageId, update])

  return (
    <Button
      type="primary"
      disabled={!pageId}
      loading={loading}
      onClick={handleSave}
    >
      <TextWidget>Save</TextWidget>
    </Button>
  )
})
