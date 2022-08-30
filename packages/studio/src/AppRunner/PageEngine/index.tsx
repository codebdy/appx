import { createForm, JSXComponent } from "@formily/core";
import { FormProvider, createSchemaField, ExpressionScope } from '@formily/react';
import { FormItem } from "@formily/antd";
import React from "react";
import { memo, useMemo } from "react";
import { Spin } from "antd";
import { useShowError } from "../../hooks/useShowError";
import { useParseLangSchema } from "../../hooks/useParseLangSchema";
import { ID } from "../../shared";
import { useQueryPageWithCache } from "../hooks/useQueryPageWithCache";
import { IUser } from "../../enthooks/hooks/useQueryMe";
import { useMe } from "../../Login/context";

export class Me {

  constructor(private me?: IUser) { }

  get shortLink() {
    return {
      id: this.me?.id
    }
  }
}

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
  const me = useMe();
  const $me = useMemo(() => new Me(me), [me]);

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
        <ExpressionScope value={{ $me }}>
          {
            page?.schemaJson?.schema &&
            <SchemaField schema={p(page?.schemaJson?.schema)}>
            </SchemaField>
          }
        </ExpressionScope>
      </FormProvider>
    </LoadingSpan>
  )
})