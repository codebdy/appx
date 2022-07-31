import 'antd/dist/antd.less'
import React, { memo, useCallback, useMemo, useState } from 'react'
import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import {
  createDesigner,
  Shortcut,
  KeyCode,
} from '@designable/core'
import {
  NavigationWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  ViewToolsWidget,
  DesignerToolsWidget,
  OutlineTreeWidget,
  ComponentTreeWidget,
} from './widgets'
import { saveSchema } from './service'
import {
  Form,
  Field,
} from '@designable/formily-antd'
import { ViewPanel, CompositePanel, WorkspacePanel, ToolbarPanel, ViewportPanel, SettingsPanel, StudioPanel } from './panels'
import { MaterialWidget } from './material/MaterialWidget'
import { convertMaterialsToComponents } from './material/model'
import { materialStore } from './material/global'
import { Designer, Workspace } from './containers'
import { useParams } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { useShowError } from '../hooks/useShowError'
import PageListWidget from './widgets/PageListWidget'
import { Spin } from 'antd'
import ModelsBoard from '../ModelBoard'
import SaveActions from '../ModelBoard/SaveActions'
import ApiBoard from '../ApiBoard'
import ModelNavMenu from './widgets/ModelNavMenu'

setNpmCDNRegistry('//unpkg.com')

const AppDesigner = memo(() => {
  const { appUuid } = useParams();
  const { data, loading, error } = useApp(appUuid)
  const [activeKey, setActiveKey] = useState<string>("pages");

  useShowError(error);

  /*
  Promise.all(
  Array.from({ length: 10 }).map((_, index) =>
    import(`/modules/module-${index}.js`)
  )import { haha } from './../../../plugins/first/src/index';

).then((modules) => modules.forEach((module) => module.load()));
*/
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
    <Spin style={{ height: "100vh" }} spinning={loading}>
      <Designer engine={engine}>
        <StudioPanel logo={<NavigationWidget app={data?.oneApp} />}
          content={
            (activeKey === "model" || activeKey === "api" || activeKey === "auth")
            && <ModelNavMenu activeKey={activeKey} onActiveKeyChange={setActiveKey} />}
          actions={
            activeKey === "model" || activeKey === "api" || activeKey === "auth"
              ? <SaveActions appUuid={appUuid} />
              : <ActionsWidget />
          }
        >
          <CompositePanel showNavTitle activeKey={activeKey} onChange={hanclePannelChange}>
            <CompositePanel.Item
              key="pages"
              title="panels.Page" icon="Page"
            >
              <PageListWidget />
            </CompositePanel.Item>
            <CompositePanel.Item
              key="coms"
              title="panels.Component"
              icon="Component"
            >
              <MaterialWidget />
            </CompositePanel.Item>
            <CompositePanel.Item
              key="outlinedTree"
              title="panels.OutlinedTree" icon="Outline"
            >
              <OutlineTreeWidget />
            </CompositePanel.Item>
            <CompositePanel.Item
              key="menu"
              title="panels.Menu"
              icon={
                <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                  <path d="M912.051527 151.150632l-286.624817 780.499041c-5.753719 15.667798-23.118384 23.704707-38.786182 17.950989a30.220937 30.220937 0 0 1-19.305944-22.909364L498.23787 550.442426a30.220937 30.220937 0 0 0-24.265655-24.265655L97.723343 457.080057c-16.415729-3.014425-27.279412-18.766366-24.264987-35.182094a30.220937 30.220937 0 0 1 19.306612-22.910032L873.263342 112.363782c15.669134-5.753719 33.033799 2.28319 38.786849 17.951656a30.220937 30.220937 0 0 1 0 20.835194zM826.833582 205.907791a7.555234 7.555234 0 0 0-9.679684-9.650301l-573.559491 207.092476a7.555234 7.555234 0 0 0 1.149942 14.527205l297.554613 56.790594a7.555234 7.555234 0 0 1 6.020837 6.087616L603.515031 788.626754a7.555234 7.555234 0 0 0 14.549911 1.210044L826.83425 205.908459z" p-id="8853"></path>
                </svg>
              }>
              <div>菜单</div>
            </CompositePanel.Item>
            <CompositePanel.Item
              key="flow"
              title="panels.Flow"
              icon={
                <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                  <path d="M826.368 482.304H197.12c-55.808 0-101.376-45.568-101.376-101.376s45.568-101.376 101.376-101.376h508.928c12.288 59.392 65.024 104.448 128 104.448 72.192 0 131.072-58.88 131.072-131.072S906.752 122.88 834.56 122.88c-62.976 0-115.712 45.056-128 104.448H197.12c-84.992 0-154.112 69.12-154.112 154.112s69.12 154.112 154.112 154.112h628.736c55.808 0 101.376 45.568 101.376 101.376s-45.568 101.376-101.376 101.376H325.632c-12.288-59.392-65.024-104.448-128-104.448-72.192 0-131.072 58.88-131.072 131.072S125.44 896 197.632 896c62.976 0 115.712-45.056 128-104.448h500.736c84.992 0 154.112-69.12 154.112-154.112 0-85.504-69.12-155.136-154.112-155.136z m8.192-306.176c43.008 0 77.824 34.816 77.824 77.824s-34.816 77.824-77.824 77.824-77.824-34.816-77.824-77.824 34.816-77.824 77.824-77.824zM197.12 842.24c-43.008 0-77.824-34.816-77.824-77.824s34.816-77.824 77.824-77.824 77.824 34.816 77.824 77.824-34.816 77.824-77.824 77.824z" p-id="21077"></path>
                </svg>
              }>
            </CompositePanel.Item>
            <CompositePanel.Item
              key="model"
              title="panels.Model"
              icon={
                <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                  <path d="M907.8 226.4l0.1-0.2L526 98.2l-13.4-4.5c-0.4-0.1-0.8-0.1-1.2 0l-13.3 4.5-381.8 128 0.1 0.2c-7.7 3.2-13.4 10.7-13.4 20v509.4c0 0.7 0.4 1.4 1.1 1.7l382 162.1 13.2 5.6 12.1 5.1c0.5 0.2 1 0.2 1.4 0l12.1-5.1 13.2-5.6 382-162.1c0.7-0.3 1.1-0.9 1.1-1.7V246.3c-0.1-9.2-5.8-16.7-13.4-19.9zM483.5 862L156 723c-0.7-0.3-1.1-0.9-1.1-1.7V294.9c0-1.3 1.3-2.2 2.5-1.7l327.5 139c0.7 0.3 1.1 0.9 1.1 1.7v426.4c0 1.3-1.3 2.2-2.5 1.7z m27.8-475L201.9 255.6c-1.5-0.7-1.5-2.9 0.1-3.4l310.1-103.9 310 103.9c1.6 0.5 1.7 2.7 0.1 3.4L512.7 387c-0.4 0.2-1 0.2-1.4 0zM868 723L540.5 862c-1.2 0.5-2.5-0.4-2.5-1.7V433.9c0-0.7 0.4-1.4 1.1-1.7l327.5-139c1.2-0.5 2.5 0.4 2.5 1.7v426.4c0 0.7-0.4 1.4-1.1 1.7z" p-id="16762"></path>
                </svg>
              }>
            </CompositePanel.Item>
          </CompositePanel>
          {
            (activeKey === "pages" || activeKey === "outlinedTree" || activeKey === "coms") &&
            <>
              <Workspace id="form">
                <WorkspacePanel>
                  <ToolbarPanel>
                    <DesignerToolsWidget />
                    <ViewToolsWidget
                      use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']}
                    />
                  </ToolbarPanel>
                  <ViewportPanel style={{ height: '100%' }}>
                    <ViewPanel type="DESIGNABLE">
                      {() => (
                        <ComponentTreeWidget
                          components={{
                            Form,
                            Field,
                            ...convertMaterialsToComponents(materialStore.modules)
                          }}
                        />
                      )}
                    </ViewPanel>
                    <ViewPanel type="JSONTREE" scrollable={false}>
                      {(tree, onChange) => (
                        <SchemaEditorWidget tree={tree} onChange={onChange} />
                      )}
                    </ViewPanel>
                    <ViewPanel type="PREVIEW">
                      {(tree) => <PreviewWidget tree={tree} />}
                    </ViewPanel>
                  </ViewportPanel>
                </WorkspacePanel>
              </Workspace>
              <SettingsPanel title="panels.PropertySettings">
                <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
              </SettingsPanel>
            </>
          }
          {
            activeKey === "model" && appUuid &&
            <Workspace id="model">
              <WorkspacePanel>
                <ViewportPanel style={{ height: '100%' }}>
                  <ModelsBoard appUuid={appUuid} />
                </ViewportPanel>
              </WorkspacePanel>
            </Workspace>
          }
          {
            activeKey === "api" && appUuid &&
            <Workspace id="api">
              <WorkspacePanel>
                <ViewportPanel style={{ height: '100%' }}>
                  <ApiBoard appUuid={appUuid} />
                </ViewportPanel>
              </WorkspacePanel>
            </Workspace>
          }
        </StudioPanel>
      </Designer>
    </Spin>
  )
})

export default AppDesigner;



