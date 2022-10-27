
import { memo, useState } from 'react';
import React from 'react';
import { useShowError } from '~/AppDesigner/hooks/useShowError';
import { Spin } from 'antd';
import { RouteContext, RunnerContext } from '@rxdrag/plugin-sdk/contexts/runner';
import { IMenuItem } from '@rxdrag/plugin-sdk/model/IMenuNode';
import { FormItem } from "@formily/antd";
import { useMemo } from "react";
import { useParseLangSchema } from "../../AppDesigner/hooks/useParseLangSchema";
import { IUser } from "~/enthooks/hooks/useQueryMe";
import { useMe } from "@rxdrag/plugin-sdk/contexts/login";
import { createSchemaField, ExpressionScope, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import { useQueryPageFrame } from '../hooks/useQueryPageFrame';
import { useMaterialComponents } from '~/material/hooks/useMaterialComponents';

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

const RunnerEngine = memo(() => {
  const [mentItem, setMenuItem] = useState<IMenuItem>()
  const p = useParseLangSchema();
  const { pageFrame, error: frameError, loading: frameLoading } = useQueryPageFrame();
  useShowError(frameError);
  const components = useMaterialComponents();
  const me = useMe();
  const $me = useMemo(() => new Me(me), [me]);
  const SchemaField = useMemo(() => createSchemaField({
    components: {
      FormItem,
      ...components
    },
  }), [components])

  const [form, newExpScope] = useMemo(
    () => {
      const newExpScope = { $me };
      return [createForm(), newExpScope];
    }
    ,
    [$me]
  );

  const runnerContextValue = useMemo(() => {
    return {
      components: components || [],
    }
  }, [components])

  console.log("呵呵", pageFrame);
  return (
    <RunnerContext.Provider value={runnerContextValue}>
      <RouteContext.Provider value={{ menuItem: mentItem, setMenuItem: setMenuItem as any }}>
        <Spin spinning={frameLoading}>
          <FormProvider form={form}>
            <ExpressionScope value={newExpScope} >
              {
                pageFrame?.schemaJson?.schema &&
                <SchemaField schema={p(pageFrame?.schemaJson?.schema || {})}>
                </SchemaField>
              }
            </ExpressionScope>
          </FormProvider>
        </Spin>
      </RouteContext.Provider>
    </RunnerContext.Provider>
  );
});

export default RunnerEngine