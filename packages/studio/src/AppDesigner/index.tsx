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

setNpmCDNRegistry('//unpkg.com')

const AppDesigner = memo(() => {
  const { appUuid } = useParams();
  const { data, loading, error } = useApp(appUuid)
  const [activedKey, setActivedKey] = useState<string>("pages");

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
    setActivedKey(activeKey)
  }, []);

  return (
    <Spin style={{ height: "100vh" }} spinning={loading}>
      <Designer engine={engine}>
        <StudioPanel logo={<NavigationWidget app={data?.oneApp} />} 
          actions={ activedKey === "model" ? <SaveActions />: <ActionsWidget />}
        >
          <CompositePanel showNavTitle activeKey={activedKey} onChange={hanclePannelChange}>
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

            <CompositePanel.Item
              key="api"
              title="panels.API"
              icon={
                <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                  <path d="M1015.684371 56.94439A33.916878 33.916878 0 0 0 967.781151 8.99122l-79.921951 79.921951a12.138146 12.138146 0 0 0-1.323707 1.498536 282.723902 282.723902 0 0 0-374.334439 22.228293l-79.722147 79.921951-7.992195 7.992195 1.473561 1.498537a33.891902 33.891902 0 0 0 6.518634 38.462439L784.110517 591.921951a34.01678 34.01678 0 0 0 38.51239 6.743415l1.448586 1.24878 87.88917-87.66439a282.22439 282.22439 0 0 0 22.478049-374.134634 6.643512 6.643512 0 0 0 1.523512-1.498537l80.04683-79.672195h-0.149854z m-151.801756 407.352195l-56.020293 55.945366L504.208859 216.538537l55.945365-55.945366a214.790244 214.790244 0 0 1 303.728391 303.703414zM592.972176 782.73561l-87.939122-87.66439 79.921951-79.921952a34.01678 34.01678 0 0 0 9.216-32.967805 33.916878 33.916878 0 0 0-57.194146-14.985365l-79.921952 79.921951-79.921951-79.921951 79.921951-79.921952a33.767024 33.767024 0 0 0-0.399609-47.453658 34.166634 34.166634 0 0 0-47.453659-0.499512l-79.921951 79.921951-87.939122-87.914147a33.991805 33.991805 0 0 0-38.537366-6.493658l-1.448585-1.498537-87.864195 87.914147a282.22439 282.22439 0 0 0-22.478049 374.134634c-0.524488 0.499512-1.048976 0.749268-1.523512 1.24878L9.442029 966.556098a33.916878 33.916878 0 0 0 47.978147 47.95317l79.921951-79.921951c0.549463-0.499512 0.849171-0.999024 1.323707-1.498537a282.723902 282.723902 0 0 0 374.334439-22.478048l79.921951-79.672195 0.149854-0.249757 7.992195-7.992195-1.548488-1.498536a33.492293 33.492293 0 0 0-6.443707-38.212683z m-127.925074 80.171707A214.790244 214.790244 0 1 1 161.393639 559.203902l55.945366-55.945365L520.992468 806.712195l-55.945366 55.945366v0.249756z m0 0" p-id="19329"></path>
                </svg>
              }>
            </CompositePanel.Item>
            <CompositePanel.Item
              key="auth"
              title="panels.Auth"
              icon={
                <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                  <path d="M513.169577 0L115.983092 126.164413c-14.864629 4.708299-24.960981 18.503314-24.980974 34.09768l2.04926 496.120737 0.46983 5.667952a347.046602 347.046602 0 0 0 98.244502 166.21994c62.43744 61.587747 215.662075 142.098656 281.048449 176.456242 10.276287 5.408046 17.943517 9.416598 22.331931 11.84572l7.457305 4.048537a17.468688 17.468688 0 0 0 16.324102 0.209924l10.866074-5.537999c38.366137-18.753224 232.545975-115.808155 304.749885-186.982438 47.872702-44.953757 81.970382-102.602927 98.284487-166.21994l2.299169-501.618751a35.791068 35.791068 0 0 0-24.980973-34.307604L513.169577 0z m355.171667 652.834113a295.624183 295.624183 0 0 1-79.791169 130.632798c-57.239318 56.469596-212.38326 137.110458-268.772885 165.540186a17.403712 17.403712 0 0 1-16.064196 0C446.21377 918.837998 293.628904 838.666966 237.969015 783.726817a294.415619 294.415619 0 0 1-79.831155-130.632798L156.128586 192.140574a15.91425 15.91425 0 0 1 11.036013-15.174517L502.383475 70.414557a35.401209 35.401209 0 0 1 21.312299 0l335.218876 106.5515a15.902254 15.902254 0 0 1 11.12598 15.174517l-1.919307 460.703535h0.219921zM519.227389 239.413493c38.805978-0.079971 76.062516 15.254488 103.562579 42.614602a142.950348 142.950348 0 0 1 42.624599 102.273046 142.968342 142.968342 0 0 1-43.224382 102.01314 146.032234 146.032234 0 0 1-67.215713 37.126585l-0.419848 60.478148h60.6081c9.646514-0.079971 18.933159 3.688667 25.800678 10.476214a36.234907 36.234907 0 0 1 10.776106 25.670725 35.860043 35.860043 0 0 1-10.826088 25.57076A36.746722 36.746722 0 0 1 614.962797 656.212892h-60.608101l-0.259906 100.93353a35.877037 35.877037 0 0 1-10.826088 25.57076 36.677747 36.677747 0 0 1-25.950624 10.566182c-9.646514 0.079971-18.933159-3.688667-25.800677-10.476214a36.251901 36.251901 0 0 1-10.776106-25.670725l0.899675-233.905483a145.674364 145.674364 0 0 1-66.955807-37.336509 143.0843 143.0843 0 0 1 0.46983-204.586078 146.827947 146.827947 0 0 1 103.912453-42.114782l0.159943 0.21992z m88.138153 143.158273a83.41486 83.41486 0 0 0-25.100931-60.13827c-33.84777-33.217997-88.038189-33.337954-122.025908-0.24991a83.175946 83.175946 0 0 0-25.570761 59.878364 84.142597 84.142597 0 0 0 25.100931 60.218242 85.863975 85.863975 0 0 0 60.868006 24.891006c46.973027-0.459834 85.209212-37.906303 86.648692-84.859338l0.079971 0.259906z m0 0" p-id="7181"></path>
                </svg>
              }>
            </CompositePanel.Item>
          </CompositePanel>
          {
            (activedKey === "pages" || activedKey === "outlinedTree" || activedKey === "coms") &&
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
            activedKey === "model" && appUuid &&
            <Workspace id="model">
              <WorkspacePanel>
                <ViewportPanel style={{ height: '100%' }}>
                  <ModelsBoard appUuid={appUuid} />
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



