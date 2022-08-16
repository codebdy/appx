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
import { useTranslation } from 'react-i18next'
import PageWorkSpace from './page/PageWorkSpace'
import MenuComponentsWidget from './menu/MenuComponentsWidget'
import MenuWorkSpace from './menu/MenuWorkSpace'
import { MenuActionsWidget } from './menu/MenuActionsWidget'
import { useShowError } from '../hooks/useShowError'
import { Spin } from 'antd'
import { useSelectedPageId } from './hooks/useSelectedPageId'
import MenuDragRoot from './menu/MenuDragRoot'
import { useAppParams } from '../shared/AppRoot/context'
import { useCagegories } from './hooks/useCagegories'
import { usePages } from './hooks/usePages'
import { SettingOutlined } from '@ant-design/icons'
import { useBuildMeta } from '../datasource/hooks'

export enum DesignerRoutes {
  Pages = "pages",
  Components = "coms",
  OutlinedTree = "outlinedTree",
  Menu = "menu",
}

const AppDesignerContent = memo(() => {
  const { app } = useAppParams();
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Pages);
  const { t } = useTranslation();
  const pageId = useSelectedPageId();
  const { categories, loading, error } = useCagegories();
  const { pages, loading: pagesLoading, error: pagesError } = usePages();
  const { error: metaError, loading: metaLoading } = useBuildMeta();

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
    <Spin style={{ height: "100vh" }} spinning={loading || pagesLoading || metaLoading}>
      <MenuDragRoot pages={pages || []}>
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
                <PageListWidget pages={pages || []} categories={categories || []} />
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
                <MenuComponentsWidget pages={pages || []} categories={categories || []} />
              </CompositePanel.Item>
              <CompositePanel.Item
                key="settings"
                title={t("Panels.Settings")}
                icon={<SettingOutlined />}>
              </CompositePanel.Item>
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
              <MenuWorkSpace app={app} pages={pages || []} categories={categories || []} />
            }
          </StudioPanel>
        </Designer >
      </MenuDragRoot>
    </Spin>
  )
})

export default AppDesignerContent;



