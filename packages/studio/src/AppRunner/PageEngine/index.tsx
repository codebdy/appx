import { createForm, JSXComponent } from "@formily/core";
import { FormProvider, createSchemaField } from '@formily/react';
import { FormItem } from "@formily/antd";
import React from "react";
import { memo, useMemo } from "react";
import { Spin } from "antd";
import { useShowError } from "../../hooks/useShowError";
import { useParseLangSchema } from "../../hooks/useParseLangSchema";
import { ID } from "../../shared";
import { useQueryPageWithCache } from "../hooks/useQueryPageWithCache";

export interface ILoadingSpanProps {
  spinning?: boolean,
  children?: React.ReactNode
}

type IComponents = Record<string, JSXComponent>;

export const PageEngine = memo((
  props: {
    pageId?: ID,
    LoadingSpan?: React.FC<ILoadingSpanProps>,
    components: IComponents,
  }
) => {
  const { pageId, LoadingSpan = Spin, components = {} } = props;

  const { page, loading, error } = useQueryPageWithCache(pageId);

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