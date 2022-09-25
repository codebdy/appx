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
import { useTranslation } from 'react-i18next'
import PageWorkSpace from './page/PageWorkSpace'
import MenuComponentsWidget from './menu/MenuComponentsWidget'
import MenuWorkSpace from './menu/MenuWorkSpace'
import { MenuActionsWidget } from './menu/MenuActionsWidget'
import { useShowError } from '../hooks/useShowError'
import { Button, Space, Spin } from 'antd'
import { useSelectedPageId } from './hooks/useSelectedPageId'
import MenuDragRoot from './menu/MenuDragRoot'
import { useAppParams, useAppViewKey } from '../shared/AppRoot/context'
import { useQueryCagegories } from './hooks/useQueryCagegories'
import { useQueryPages } from './hooks/useQueryPages'
import { SettingOutlined } from '@ant-design/icons'
import { useBuildMeta } from '../datasource/hooks'
import { useSetRecoilState } from 'recoil'
import { categoriesState, pageFramesState, pagesState } from './recoil/atom'
import ConfigWorkSpace from './config/ConfigWorkSpace'
import { ConfigActionsWidget } from './config/ConfigActionsWidget'
import { useQueryPageFrames } from './hooks/useQueryPageFrames'
import PageListWidget from './page/PageListWidget'
import { PageFrameListWidget } from './widgets/PageFrameListWidget'
import { useSelectedFrameId } from './hooks/useSelectedFrameId'

export enum DesignerRoutes {
  Templates = "templates",
  Pages = "pages",
  Components = "coms",
  Fragments = "fratments",
  PageFrames = "pageFrames",
  OutlinedTree = "outlinedTree",
  Menu = "menu",
  Settings = "settings"
}

const AppDesignerContent = memo(() => {
  const { app, device } = useAppParams();
  const key = useAppViewKey()
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Pages);
  const { t } = useTranslation();
  const setCategories = useSetRecoilState(categoriesState(key))
  const setPages = useSetRecoilState(pagesState(key))
  const setPageFrames = useSetRecoilState(pageFramesState(key))
  const pageId = useSelectedPageId();
  const frameId = useSelectedFrameId();
  const { categories, loading, error } = useQueryCagegories();
  const { pages, loading: pagesLoading, error: pagesError } = useQueryPages();
  const { error: metaError, loading: metaLoading } = useBuildMeta();
  const { pageFrames, error: framesError, loading: framesLoading } = useQueryPageFrames(device);

  useEffect(() => {
    setPages(pages || []);
  }, [pages, setPages])

  useEffect(() => {
    setCategories(categories || []);
  }, [categories, setCategories])

  useEffect(() => {
    setPageFrames(pageFrames || []);
  }, [pageFrames, setPageFrames])

  useShowError(error || pagesError || metaError || framesError);

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
    <Spin style={{ height: "100vh" }} spinning={loading || pagesLoading || metaLoading || framesLoading}>
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
                  <svg fill="currentColor" style={{ width: "22px", height: "22px" }} viewBox="0 0 1024 1024">
                    <path d="M917.157111 911.728984L539.691177 911.728984l0-465.389426 377.464911 0L917.156088 911.728984zM591.663876 859.202677l273.519514 0 0-360.336812-273.519514 0L591.663876 859.202677zM484.299613 911.728984l-377.456724 0 0-193.578834 377.456724 0L484.299613 911.728984zM158.805354 859.202677l273.529747 0 0-88.515986-273.529747 0L158.805354 859.202677zM917.157111 417.779082L106.842889 417.779082 106.842889 112.271016l810.314223 0L917.157111 417.779082zM158.805354 364.679723l706.378036 0 0-199.872167-706.378036 0L158.805354 364.679723zM484.299613 675.897837l-377.456724 0 0-229.558279 377.456724 0L484.299613 675.897837zM158.805354 623.924115l273.529747 0 0-125.058251-273.529747 0L158.805354 623.924115z"></path>
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
                  <svg fill="currentColor" style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                    <path d="M912.051527 151.150632l-286.624817 780.499041c-5.753719 15.667798-23.118384 23.704707-38.786182 17.950989a30.220937 30.220937 0 0 1-19.305944-22.909364L498.23787 550.442426a30.220937 30.220937 0 0 0-24.265655-24.265655L97.723343 457.080057c-16.415729-3.014425-27.279412-18.766366-24.264987-35.182094a30.220937 30.220937 0 0 1 19.306612-22.910032L873.263342 112.363782c15.669134-5.753719 33.033799 2.28319 38.786849 17.951656a30.220937 30.220937 0 0 1 0 20.835194zM826.833582 205.907791a7.555234 7.555234 0 0 0-9.679684-9.650301l-573.559491 207.092476a7.555234 7.555234 0 0 0 1.149942 14.527205l297.554613 56.790594a7.555234 7.555234 0 0 1 6.020837 6.087616L603.515031 788.626754a7.555234 7.555234 0 0 0 14.549911 1.210044L826.83425 205.908459z" p-id="8853"></path>
                  </svg>
                }>
                <MenuComponentsWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.PageFrames}
                title={t("Panels.Pageframes")}
                icon={
                  <svg fill="currentColor" style={{ width: 28, height: 28 }} viewBox="0 0 1024 1024">
                    <path d="M426.666667 426.666667v384H384v-384H256V384h554.666667v42.666667h-384zM213.333333 213.333333h640v640H213.333333V213.333333z m42.666667 42.666667v554.666667h554.666667V256H256z"></path>
                  </svg>
                }
              >
                <PageFrameListWidget />
              </CompositePanel.Item>
              <CompositePanel.Item
                key={DesignerRoutes.Settings}
                title={t("Panels.Settings")}
                icon={<SettingOutlined />}>
              </CompositePanel.Item>
            </CompositePanel>
            {
              (pageId || frameId) && <PageWorkSpace pageOrFrameId={pageId || frameId} activeKey={activeKey} visable={
                activeKey === DesignerRoutes.Pages ||
                activeKey === DesignerRoutes.OutlinedTree ||
                activeKey === DesignerRoutes.Components ||
                activeKey === DesignerRoutes.Fragments ||
                activeKey === DesignerRoutes.PageFrames
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

export default AppDesignerContent;
