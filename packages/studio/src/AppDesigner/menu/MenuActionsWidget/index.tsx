import React, { useCallback } from 'react'
import { Space, Button, message } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { useUpdatePage } from '../../../hooks/useUpdatePage'
import { useShowError } from '../../../hooks/useShowError'
import { useTranslation } from 'react-i18next'

export const MenuActionsWidget = observer(() => {
  const designer = useDesigner();
  const { t } = useTranslation();
  const [update, { loading, error }] = useUpdatePage({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
    }
  });

  useShowError(error);

  const handleSave = useCallback(() => {
    
  }, [])

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        type="primary"
        loading={loading}
        onClick={handleSave}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </Space>
  )
})
