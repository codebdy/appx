import { createForm } from "@formily/core";
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
import { useAppParams } from "~/plugin-sdk/contexts/app";
import { PageContext } from "~/plugin-sdk/contexts/page";
import { useCheckComponentAuth } from "./hooks/useCheckComponentAuth";

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

export const PageEngine = memo((
  props: {
    pageUuid?: ID,
    LoadingSpan?: React.FC<ILoadingSpanProps>,
  }
) => {
  const { pageUuid, LoadingSpan = Spin } = props;
  const { page, loading, error } = useQueryPageWithCache(pageUuid);
  const me = useMe();
  const $me = useMemo(() => new Me(me), [me]);
  const expScope = useExpressionScope()
  const { components } = useAppParams();
  console.log("PageEngine 刷新", pageUuid, page, loading)
  const p = useParseLangSchema();
  const check = useCheckComponentAuth();
  useShowError(error);

  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      ...components || {}
    },
  }), [components])

  const [form, newExpScope] = useMemo(
    () => {
      const newExpScope = { ...expScope || {}, $me };
      return [createForm(), newExpScope];
    }
    ,
    [$me, expScope, pageUuid]
  );

  return (
    <LoadingSpan spinning={loading}>
      {
        page?.schemaJson?.schema && pageUuid === page.uuid &&
        <PageContext.Provider value={page}>
          <FormProvider form={form}>
            <ExpressionScope value={newExpScope} >
              <SchemaField schema={check(p(JSON.parse(JSON.stringify(page?.schemaJson?.schema || "{}"))))}>
              </SchemaField>
            </ExpressionScope>
          </FormProvider>
        </PageContext.Provider>
      }
    </LoadingSpan>
  )
})