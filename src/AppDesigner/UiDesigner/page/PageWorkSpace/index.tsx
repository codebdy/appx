import React, { useEffect } from "react";
import {
  PreviewWidget,
  SchemaEditorWidget,
  ViewToolsWidget,
  DesignerToolsWidget,
  ComponentTreeWidget,
  IconWidget,
} from '../../widgets'
import { ViewPanel, WorkspacePanel, ToolbarPanel, ViewportPanel, SettingsPanel } from '../../panels'
import { Workspace } from '../../containers'
import { SettingsForm } from '../../SettingsForm'
import { Field } from '~/components/common/Field'
import { useTranslation } from "react-i18next";
import { Button, Spin } from "antd";
import { ID } from "~/shared";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { transformToTreeNode } from "../../transformer";
import { useDesigner } from '@designable/react'
import { useLazyQueryPage } from "~/AppDesigner/hooks/useLazyQueryPage";
import { FormDesigner } from "~/components/pc/FormDesigner";
import { ObjectContainer } from "@designable/formily-antd";
import { useMaterialDesigners } from "~/material/hooks/useMaterialDesigners";

const PageWorkSpace = (props: {
  pageId: ID,
  visable: boolean | undefined,
}) => {
  const { pageId, visable } = props;
  const designer = useDesigner();
  const [query, { page, loading, error }] = useLazyQueryPage();
  const materailDesigners = useMaterialDesigners();

  useEffect(() => {
    query(pageId)
  }, [pageId, query]);

  const { t } = useTranslation();

  useEffect(() => {
    designer.setCurrentTree(
      transformToTreeNode(page?.schemaJson || {})
    )
  }, [designer, page?.schemaJson])

  useShowError(error);

  return (
    visable && (
      loading ?
        <Spin>
          <div style={{ width: "calc(100vw - 280px)", height: "calc(100vh - 64px)" }}>
          </div>
        </Spin>
        :
        <>
          <Workspace id="form">
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <div>
                  <Button.Group size="small" style={{ marginRight: 20 }}>
                    <Button
                      size="small"
                    //disabled={!history?.allowUndo}
                    >
                      <IconWidget infer={
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M189.508 924.846h578.961c68.786 0 124.748-55.961 124.748-124.747v-351.89c0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32v351.89c0 33.496-27.251 60.747-60.748 60.747H189.508c-33.497 0-60.748-27.251-60.748-60.747V221.138c0-33.496 27.251-60.748 60.748-60.748H465.74c17.673 0 32-14.327 32-32 0-17.673-14.327-32-32-32H189.508c-68.786 0-124.748 55.961-124.748 124.748v578.961c0 68.786 55.962 124.747 124.748 124.747z" fill="" p-id="21122"></path><path d="M777.422 472.1L960.3 65.904l-442.767 67.054 91.272 119.106 47.138-35.893-38.349-50.044 263.055-39.838-108.65 241.329-38.806-50.639-47.141 35.889z" fill="" p-id="21123"></path><path d="M506.643 737.05l18.893-95.222c0.29-1.455 29.815-147.053 90.233-217.906 42.878-50.285 78.57-72.375 96.031-81.068 5.095-2.536 7.972-3.569 8.021-3.586-0.255 0.09-0.385 0.129-0.385 0.129l-3.355-44.814c-1.626 0.534-7.676 2.647-17.284 7.43-22.746 11.324-68.628 39.382-120.378 100.072-34.385 40.324-59.49 97.092-76.435 145.896-8.477-46.744-11.408-104.641 10.521-149.914 22.803-47.076 59.995-86.965 87.179-112.137 30.21-27.973 55.261-44.636 55.511-44.802l-21.023-36.222c-4.706 3.095-115.864 77.043-168.508 185.728-22.711 46.885-27.883 106.508-15.372 177.211 9.036 51.07 24.104 88.913 24.741 90.499l31.61 78.706z" fill="" p-id="21124"></path><path d="M615.896 161.173l-47.415 35.525 52.444 70.463 47.416-35.526zM669.063 330.105l47.186-35.638 21.54 28.52-47.186 35.638z" fill="" p-id="21125"></path></svg>
                      } />
                    </Button>
                  </Button.Group>

                  <ViewToolsWidget
                    use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']}
                  />
                </div>
              </ToolbarPanel>
              <ViewportPanel style={{ height: '100%' }}>
                <ViewPanel type="DESIGNABLE">
                  {() => (
                    <ComponentTreeWidget
                      components={{
                        Form: FormDesigner,
                        Field,
                        ObjectContainer,
                        ...materailDesigners,
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
          <SettingsPanel title={t("Panels.PropertySettings")}>
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </>
    )
  )
}

export default PageWorkSpace;