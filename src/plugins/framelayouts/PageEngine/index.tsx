import { createForm, JSXComponent } from "@formily/core";
import { FormProvider, createSchemaField, useExpressionScope, ExpressionScope } from '@formily/react';
import { FormItem } from "@formily/antd";
import React, { memo } from "react";
import { useMemo } from "react";
import { Spin } from "antd";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { useParseLangSchema } from "~/AppDesigner/hooks/useParseLangSchema";
import { ID } from "~/shared";
import { useQueryPageWithCache } from "./hooks/useQueryPageWithCache";
import { IUser } from "~/enthooks/hooks/useQueryMe";
import { useMe } from "@rxdrag/plugin-sdk/contexts/login";

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
    pageUuid?: ID,
    LoadingSpan?: React.FC<ILoadingSpanProps>,
    components: IComponents,
  }
) => {
  const { pageUuid, LoadingSpan = Spin, components = {} } = props;
  const { page, loading, error } = useQueryPageWithCache(pageUuid);
  const me = useMe();
  const $me = useMemo(() => new Me(me), [me]);
  const expScope = useExpressionScope()
  console.log("PageEngine 刷新", pageUuid, page)
  const p = useParseLangSchema();
  useShowError(error);

  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      ...components
    },
  }), [components])

  const [form, newExpScope] = useMemo(
    () => {
      const newExpScope = { ...expScope || {}, $me };
      return [createForm(), newExpScope];
    }
    ,
    [$me, expScope]
  );

  return (
    <LoadingSpan spinning={loading}>
      <FormProvider form={form}>
        <ExpressionScope value={newExpScope} >
          {
            page?.schemaJson?.schema &&
            <SchemaField schema={p(JSON.parse(JSON.stringify(page?.schemaJson?.schema || "{}")))}>
            </SchemaField>
          }
        </ExpressionScope>
      </FormProvider>
    </LoadingSpan>
  )
})