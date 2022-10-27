import React, { memo, useCallback, useMemo } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate, useParams } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useDevices } from '~/AppDesigner/hooks/useDevices';
import { DESIGN, DESIGN_BOARD } from '~/consts';
import { AppEntryRouts } from '../DesignerHeader/AppEntryRouts';
import { useDesignerParams } from '~/plugin-sdk';

export const NavigationWidget = memo(() => {
  const { app } = useDesignerParams();
  const { device } = useParams();
  const { t } = useTranslation();
  const devices = useDevices();
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate(`/${DESIGN}/${app?.id}/${DESIGN_BOARD}/${AppEntryRouts.Frame}`)
  }, [app]);

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
