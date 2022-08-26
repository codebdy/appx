import { createForm, JSXComponent } from "@formily/core";
import { FormProvider, createSchemaField } from '@formily/react';
import { FormItem } from "@formily/antd";
import React from "react";
import { memo, useMemo } from "react";
import { Spin } from "antd";
import { useQueryPage } from "../../hooks/useQueryPage";
import { useShowError } from "../../hooks/useShowError";
import { useParseLangSchema } from "../../hooks/useParseLangSchema";
import { useParams } from "react-router-dom";
import { useGetMenuItem } from "../hooks/useGetMenuItem";
import { useEntryPageId } from "../hooks/useEntryPageId";

export interface ILoadingSpanProps {
  spinning?: boolean,
  children?: React.ReactNode
}

type IComponents = Record<string, JSXComponent>;

const PageEngine = memo((
  props: {
    LoadingSpan?: React.FC<ILoadingSpanProps>,
    components: IComponents,
  }
) => {
  const { LoadingSpan = Spin, components = {} } = props;
  const { menuUuid, pageId } = useParams();
  const getMenuItem = useGetMenuItem();
  const entryId = useEntryPageId();

  const pageIdFormMenu = useMemo(() => getMenuItem(menuUuid)?.route?.pageId, [getMenuItem, menuUuid])

  const { page, loading, error } = useQueryPage(pageId || pageIdFormMenu || entryId);

  const p = useParseLangSchema();
  useShowError(error);

  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      ...components
    },
  }), [components])

  const form = useMemo(() => createForm(), [])

  return (
    <LoadingSpan spinning={loading}>
      <FormProvider form={form}>
        {
          page?.schemaJson?.schema &&
          <SchemaField schema={p(page?.schemaJson?.schema)}>
          </SchemaField>
        }

      </FormProvider>
    </LoadingSpan>
  )
})

export default PageEngine;