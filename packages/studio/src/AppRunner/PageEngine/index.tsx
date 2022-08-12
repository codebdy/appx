import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from '@formily/react';
import { ArrayTable, FormItem, Input } from "@formily/antd";
import React from "react";
import { memo, useMemo } from "react";
import { useMenuRoute } from "../context/route";
import { Spin } from "antd";
import { usePage } from "../../hooks/usePage";
import { useShowError } from "../../hooks/useShowError";

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
  const { menuItem } = useMenuRoute();

  const { page, loading, error } = usePage(menuItem?.route?.pageId);

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
          <SchemaField schema={page?.schemaJson?.schema}>
          </SchemaField>
        }

      </FormProvider>
    </LoadingSpan>
  )
})

export default PageEngine;