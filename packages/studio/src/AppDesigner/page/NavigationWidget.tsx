import React, { memo, useCallback, useMemo } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate, useParams } from "react-router-dom"
import { IApp } from '../../model';
import { AppConfigRouts } from '../../AppConfig/AppConfigRouts';
import { useParseLangMessage } from '../../hooks/useParseLangMessage';
import { DesignerRoutes } from '../AppDesignerContent';
import { useTranslation } from 'react-i18next';
import { useSelectedPageId } from '../hooks/useSelectedPageId';
import { usePages } from '../hooks/usePages';

// const logo = {
//   dark: '//img.alicdn.com/imgextra/i2/O1CN01NTUDi81fHLQvZCPnc_!!6000000003981-55-tps-1141-150.svg',
//   light:
//     '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
// }

export const NavigationWidget = memo((
  props: {
    app: IApp,
    activeKey?: DesignerRoutes
  }
) => {
  const { app, activeKey } = props;
  const { appUuid } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate()
  const parse = useParseLangMessage();
  const handleBack = useCallback(() => {
    navigate(`/config-app/${appUuid}/${AppConfigRouts.App}`)
  }, [appUuid, navigate]);
  const pageId = useSelectedPageId();
  const pages = usePages();
  const selectedPage = useMemo(() => {
    return pages?.find(pg => pg.id === pageId)
  }, [pageId, pages])

  const p = useParseLangMessage();

  const subTitle = useMemo(() => {
    if (activeKey === DesignerRoutes.Pages || activeKey === DesignerRoutes.OutlinedTree || activeKey === DesignerRoutes.Components) {
      return t("Designer.Pages")
    } else if (activeKey === DesignerRoutes.Menu) {
      return t("Designer.Menu")
    } else if (activeKey === DesignerRoutes.Settings) {
      return t("Designer.Settings")
    }
  }, [activeKey, t])

  return (
    <div className='navigation-widget'>
      <Button className='no-border' shape='circle' onClick={handleBack}>
        <ArrowLeftOutlined />
      </Button>
      <Divider type="vertical" />
      <Breadcrumb>
        <Breadcrumb.Item>
          {parse(app?.title)}
        </Breadcrumb.Item>
        <Breadcrumb.Item>{subTitle}</Breadcrumb.Item>
        {
          selectedPage &&
          <Breadcrumb.Item>{p(selectedPage.title)}</Breadcrumb.Item>
        }
      </Breadcrumb>
    </div>
  )
})
