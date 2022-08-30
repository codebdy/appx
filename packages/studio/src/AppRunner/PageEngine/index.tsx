import { createForm, JSXComponent } from "@formily/core";
import { Schema, FormProvider, createSchemaField, useExpressionScope } from '@formily/react';
import { FormItem } from "@formily/antd";
import React, { memo } from "react";
import { useMemo } from "react";
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

  get id() {
    return this.me?.id
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
  const expScope = useExpressionScope()

  const p = useParseLangSchema();
  useShowError(error);

  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      ...components
    },
  }), [components])

  const [schema, form] = useMemo(
    () => {
      const newSchema = Schema.compile(p(page?.schemaJson?.schema), { ...expScope || {}, $me });
      return [newSchema, createForm()];
    }
    ,
    [$me, expScope, p, page?.schemaJson?.schema]
  );

  return (
    <LoadingSpan spinning={loading}>
      <FormProvider form={form}>
        {
          page?.schemaJson?.schema &&
          <SchemaField schema={schema}>
          </SchemaField>
        }
      </FormProvider>
    </LoadingSpan>
  )
})