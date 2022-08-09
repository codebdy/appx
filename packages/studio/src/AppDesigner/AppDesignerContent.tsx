import 'antd/dist/antd.less'
import React, { memo, useCallback, useMemo, useState } from 'react'
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
import { saveSchema } from './service'
import { CompositePanel, StudioPanel } from './panels'
import { MaterialWidget } from './widgets/MaterialWidget'
import { Designer } from './containers'
import PageListWidget from './page/PageListWidget'
import { useDesignerParams } from './context'
import { useTranslation } from 'react-i18next'
import PageWorkSpace from './page/PageWorkSpace'
import MenuComponentsWidget from './menu/MenuComponentsWidget'
import MenuWorkSpace from './menu/MenuWorkSpace'
import { MenuActionsWidget } from './menu/MenuActionsWidget'
import { useShowError } from '../hooks/useShowError'
import { Spin } from 'antd'
import { useSelectedPageId } from './hooks/useSelectedPageId'
import { useCagegories } from './hooks/useCagegories'

export enum DesignerRoutes {
  Pages = "pages",
  Components = "coms",
  OutlinedTree = "outlinedTree",
  Menu = "menu",
}

const AppDesignerContent = memo(() => {
  const app = useDesignerParams().app;
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Pages);
  const { t } = useTranslation();
  const pageId = useSelectedPageId();
  const { categories, loading, error } = useCagegories();
  const { pages, loading: pagesLoading, error: pagesError } = usePages();
  useShowError(error || pagesError);

  const engine = useMemo(
    () => createDesigner({
      shortcuts: [
        new Shortcut({
          codes: [
            [KeyCode.Meta, KeyCode.S],
            [KeyCode.Control, KeyCode.S],
          ],
          handler(ctx) {
            saveSchema(ctx.engine)
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


  return (
    <Spin style={{ height: "100vh" }} spinning={loading || pagesLoading}>
      <Designer engine={engine}>
        <StudioPanel logo={<NavigationWidget app={app} />}
          actions={
            activeKey === DesignerRoutes.Menu
              ?
              <MenuActionsWidget />
              :
              <ActionsWidget />
          }
        >
          <CompositePanel showNavTitle activeKey={activeKey} onChange={hanclePannelChange}>
            <CompositePanel.Item
              key={DesignerRoutes.Pages}
              title={t("Panels.Page")} icon="Page"
            >
              <PageListWidget pages={pages} categories={categories} />
            </CompositePanel.Item>
            <CompositePanel.Item
              key={DesignerRoutes.Components}
              title={t("Panels.Component")}
              icon="Component"
            >
              <MaterialWidget />
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
            {/* <CompositePanel.Item
            key="flow"
            title="panels.Flow"
            icon={
              <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                <path d="M826.368 482.304H197.12c-55.808 0-101.376-45.568-101.376-101.376s45.568-101.376 101.376-101.376h508.928c12.288 59.392 65.024 104.448 128 104.448 72.192 0 131.072-58.88 131.072-131.072S906.752 122.88 834.56 122.88c-62.976 0-115.712 45.056-128 104.448H197.12c-84.992 0-154.112 69.12-154.112 154.112s69.12 154.112 154.112 154.112h628.736c55.808 0 101.376 45.568 101.376 101.376s-45.568 101.376-101.376 101.376H325.632c-12.288-59.392-65.024-104.448-128-104.448-72.192 0-131.072 58.88-131.072 131.072S125.44 896 197.632 896c62.976 0 115.712-45.056 128-104.448h500.736c84.992 0 154.112-69.12 154.112-154.112 0-85.504-69.12-155.136-154.112-155.136z m8.192-306.176c43.008 0 77.824 34.816 77.824 77.824s-34.816 77.824-77.824 77.824-77.824-34.816-77.824-77.824 34.816-77.824 77.824-77.824zM197.12 842.24c-43.008 0-77.824-34.816-77.824-77.824s34.816-77.824 77.824-77.824 77.824 34.816 77.824 77.824-34.816 77.824-77.824 77.824z" p-id="21077"></path>
              </svg>
            }>
          </CompositePanel.Item> */}
          </CompositePanel>
          {
            pageId && <PageWorkSpace pageId={pageId} visable={
              activeKey === DesignerRoutes.Pages ||
              activeKey === DesignerRoutes.OutlinedTree ||
              activeKey === DesignerRoutes.Components
            } />
          }

          {
            activeKey === DesignerRoutes.Menu &&
            <MenuWorkSpace pages={pages} categories={categories}/>
          }
        </StudioPanel>
      </Designer >
    </Spin>
  )
})

export default AppDesignerContent;



