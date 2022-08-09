import React, { useCallback } from 'react'
import { Space, Button } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { observer } from '@formily/react'
import { saveSchema } from '../service'

export const ActionsWidget = observer(() => {
  const designer = useDesigner()
  const handleSave = useCallback(()=>{

  }, [designer])

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        type="primary"
        onClick={handleSave}
      >
        <TextWidget>Save</TextWidget>
      </Button>
    </Space>
  )
})
