import 'antd/dist/antd.less'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  createDesigner,
  Shortcut,
  KeyCode,
} from '@designable/core'
import {
  NavigationWidget,
  ActionsWidget,
  OutlineTreeWidget,
} from './widgets'
import { CompositePanel, StudioPanel } from './panels'
import { MaterialWidget } from './widgets/MaterialWidget'
import { Designer } from './containers'
import PageListWidget from './page/PageListWidget'
import { useTranslation } from 'react-i18next'
import PageWorkSpace from './page/PageWorkSpace'
import MenuComponentsWidget from './menu/MenuComponentsWidget'
import MenuWorkSpace from './menu/MenuWorkSpace'
import { MenuActionsWidget } from './menu/MenuActionsWidget'
import { useShowError } from '~/AppDesigner/hooks/useShowError'
import { Button, Space, Spin } from 'antd'
import { useSelectedPageId } from './hooks/useSelectedPageId'
import MenuDragRoot from './menu/MenuDragRoot'
import { useAppParams, useAppViewKey } from '@rxdrag/plugin-sdk/contexts/appRoot'
import { useQueryCagegories } from './hooks/useQueryCagegories'
import { useQueryPages } from './hooks/useQueryPages'
import { SettingOutlined } from '@ant-design/icons'
import { useBuildMeta } from '~/datasource/hooks'
import { useSetRecoilState } from 'recoil'
import { categoriesState, pagesState } from './recoil/atom'
import ConfigWorkSpace from './config/ConfigWorkSpace'
import { ConfigActionsWidget } from './config/ConfigActionsWidget'

export enum DesignerRoutes {
  Templates = "Templates",
  Pages = "pages",
  Components = "coms",
  Fragments = "fratments",
  OutlinedTree = "outlinedTree",
  Menu = "menu",
  Settings = "settings"
}

export const UiDesigner = memo(() => {
  const { app, device } = useAppParams();
  const key = useAppViewKey()
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Pages);
  const { t } = useTranslation();
  const setCategories = useSetRecoilState(categoriesState(key))
  const setPages = useSetRecoilState(pagesState(key))
  const pageId = useSelectedPageId();
  const { categories, loading, error } = useQueryCagegories();
  const { pages, loading: pagesLoading, error: pagesError } = useQueryPages();
  const { error: metaError, loading: metaLoading } = useBuildMeta();

  useEffect(() => {
    setPages(pages || []);
  }, [pages, setPages])

  useEffect(() => {
    setCategories(categories || []);
  }, [categories, setCategories])

  useShowError(error || pagesError || metaError);

  const engine = useMemo(
    () => createDesigner({
      shortcuts: [
        new Shortcut({
          codes: [
            [KeyCode.Meta, KeyCode.S],
            [KeyCode.Control, KeyCode.S],
          ],
          handler(ctx) {
            //saveSchema(ctx.engine)
          },
        }),
      ],
      rootComponentName: 'Form',
    }),
    []
  )

  const hanclePannelChange = useCallback((activeKey: string) => {
    setActiveKey(activeKey)
  }, []);

  const renderActions = useCallback(() => {
    if (activeKey === DesignerRoutes.Menu) {
      return <MenuActionsWidget />
    } else if (activeKey === DesignerRoutes.Settings) {
      return <ConfigActionsWidget />
    } else {
      return <ActionsWidget />
    }
  }, [activeKey])

  const handlePreview = useCallback(() => {
    window.open(`/app/${device}/${app?.uuid}`)
  }, [app?.uuid, device])

  return (
    <Spin style={{ height: "100vh" }} spinning={loading || pagesLoading || metaLoading}>
      <MenuDragRoot>
        <Designer engine={engine}>
          <StudioPanel logo={<NavigationWidget app={app} activeKey={activeKey as any} />}
            actions={
              <Space style={{ marginRight: 10 }}>
                <Button onClick={handlePreview}>{t("Designer.Preview")}</Button>
                {
                  renderActions()
                }
              </Space>
            }
          >
            <CompositePanel showNavTitle activeKey={activeKey} onChange={hanclePannelChange}>
              <CompositePanel.Item
                key={DesignerRoutes.Pages}
                title={t("Panels.Page")} icon="Page"
              >
                <PageListWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Components}
                title={t("Panels.Component")}
                icon="Component"
              >
                <MaterialWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Templates}
                title={t("Panels.Templates")}
                icon={
                  <svg className='nav-icon' viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,18.54L19.37,12.8L21,14.07L12,21.07L3,14.07L4.62,12.81L12,18.54M12,16L3,9L12,2L21,9L12,16M12,4.53L6.26,9L12,13.47L17.74,9L12,4.53Z" />
                  </svg>
                }
              >
                代码片段
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.OutlinedTree}
                title={t("Panels.OutlinedTree")} icon="Outline"
              >
                <OutlineTreeWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Menu}
                title={t("Panels.Menu")}
                icon={
                  <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                    <path d="M912.051527 151.150632l-286.624817 780.499041c-5.753719 15.667798-23.118384 23.704707-38.786182 17.950989a30.220937 30.220937 0 0 1-19.305944-22.909364L498.23787 550.442426a30.220937 30.220937 0 0 0-24.265655-24.265655L97.723343 457.080057c-16.415729-3.014425-27.279412-18.766366-24.264987-35.182094a30.220937 30.220937 0 0 1 19.306612-22.910032L873.263342 112.363782c15.669134-5.753719 33.033799 2.28319 38.786849 17.951656a30.220937 30.220937 0 0 1 0 20.835194zM826.833582 205.907791a7.555234 7.555234 0 0 0-9.679684-9.650301l-573.559491 207.092476a7.555234 7.555234 0 0 0 1.149942 14.527205l297.554613 56.790594a7.555234 7.555234 0 0 1 6.020837 6.087616L603.515031 788.626754a7.555234 7.555234 0 0 0 14.549911 1.210044L826.83425 205.908459z" p-id="8853"></path>
                  </svg>
                }>
                <MenuComponentsWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Settings}
                title={t("Panels.Settings")}
                icon={<SettingOutlined />}>
              </CompositePanel.Item>
            </CompositePanel>
            {
              pageId && <PageWorkSpace pageId={pageId} visable={
                activeKey === DesignerRoutes.Pages ||
                activeKey === DesignerRoutes.OutlinedTree ||
                activeKey === DesignerRoutes.Components ||
                activeKey === DesignerRoutes.Fragments
              } />
            }

            {
              activeKey === DesignerRoutes.Menu &&
              <MenuWorkSpace app={app} />
            }
            {
              activeKey === DesignerRoutes.Settings &&
              <ConfigWorkSpace />
            }
          </StudioPanel>
        </Designer >
      </MenuDragRoot>
    </Spin>
  )
})




