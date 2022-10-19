import React, { memo, useCallback, useMemo } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Divider } from 'antd'
import { useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useDevices } from '~/hooks/useDevices';

export const NavigationWidget = memo(() => {
  const { device } = useParams();
  const { t } = useTranslation();
  const devices = useDevices();
  const handleBack = useCallback(() => {
    window.history.back()
  }, []);

  const deviceInfo = useMemo(() => devices.find(dvc => dvc.key === device), [device, devices]);

  return (
    <div className='navigation-widget'>
      <Button className='no-border' shape='circle' onClick={handleBack}>
        <ArrowLeftOutlined />
      </Button>
      <Divider type="vertical" />
      <Breadcrumb>
        <Breadcrumb.Item>
          {t("PageFrames.Title")}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{deviceInfo?.name || ""}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
})
