import React, { memo, useCallback, useMemo } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Divider } from 'antd'
import { useNavigate, useParams } from "react-router-dom"
import { IApp } from '~/model';
import { useParseLangMessage } from '@rxdrag/plugin-sdk/hooks/useParseLangMessage';
import { useTranslation } from 'react-i18next';
import { useSelectedPageId } from '../hooks/useSelectedPageId';
import { usePages } from '../hooks/usePages';
import { AppEntryRouts } from '~/AppDesigner/DesignerHeader/AppEntryRouts';
import { DESIGN, DESIGN_BOARD } from '~/consts';
import { DesignerRoutes } from '..';

export const NavigationWidget = memo((
  props: {
    app: IApp,
    activeKey?: DesignerRoutes
  }
) => {
  const { app, activeKey } = props;
  const { appId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate()
  const parse = useParseLangMessage();
  const handleBack = useCallback(() => {
    navigate(`/${DESIGN}/${appId}/${DESIGN_BOARD}/${AppEntryRouts.AppUis}`)
  }, [appId, navigate]);
  const pageId = useSelectedPageId();
  const pages = usePages();
  const selectedPage = useMemo(() => {
    return pages?.find(pg => pg.id === pageId)
  }, [pageId, pages])

  const p = useParseLangMessage();

  const isPageEdit = useMemo(() => activeKey === DesignerRoutes.Pages ||
    activeKey === DesignerRoutes.OutlinedTree ||
    activeKey === DesignerRoutes.Components,
    [activeKey])
  const subTitle = useMemo(() => {
    if (isPageEdit) {
      return t("Designer.Pages")
    } else if (activeKey === DesignerRoutes.Menu) {
      return t("Designer.Menu")
    } else if (activeKey === DesignerRoutes.Settings) {
      return t("Designer.Settings")
    }
  }, [activeKey, isPageEdit, t])

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
          selectedPage && isPageEdit &&
          <Breadcrumb.Item>{p(selectedPage.title)}</Breadcrumb.Item>
        }
      </Breadcrumb>
    </div>
  )
})
