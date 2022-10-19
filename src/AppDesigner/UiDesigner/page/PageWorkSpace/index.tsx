import React, { useEffect } from "react";
import {
  PreviewWidget,
  SchemaEditorWidget,
  ViewToolsWidget,
  DesignerToolsWidget,
  ComponentTreeWidget,
} from '../../widgets'
import { ViewPanel, WorkspacePanel, ToolbarPanel, ViewportPanel, SettingsPanel } from '../../panels'
import { Workspace } from '../../containers'
import { SettingsForm } from '../../SettingsForm'
import { Field } from '~/components/common/Field'
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { ID } from "~/shared";
import { useShowError } from "~/hooks/useShowError";
import { transformToTreeNode } from "../../transformer";
import { useDesigner } from '@designable/react'
import { useLazyQueryPage } from "~/hooks/useLazyQueryPage";
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
                <ViewToolsWidget
                  use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']}
                />
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