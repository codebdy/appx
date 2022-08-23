import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from '@formily/react';
import { ArrayTable, FormItem, Input } from "@formily/antd";
import React from "react";
import { memo, useMemo } from "react";
import { Spin } from "antd";
import { useQueryPage } from "../../hooks/useQueryPage";
import { useShowError } from "../../hooks/useShowError";
import { useParseLangSchema } from "../../hooks/useParseLangSchema";
import { useParams } from "react-router-dom";
import { useGetMenuItem } from "../hooks/useGetMenuItem";

export interface ILoadingSpanProps {
  spinning?: boolean,
  children?: React.ReactNode
}

const PageEngine = memo((
  props: {
    LoadingSpan?: React.FC<ILoadingSpanProps>,
  }
) => {
  const { LoadingSpan = Spin } = props;
  const { menuUuid } = useParams();
  const getMenuItem = useGetMenuItem();

  const { page, loading, error } = useQueryPage(getMenuItem(menuUuid)?.route?.pageId);

  const p = useParseLangSchema();
  useShowError(error);

  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      Input,
      ArrayTable
    },
  }), [])

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