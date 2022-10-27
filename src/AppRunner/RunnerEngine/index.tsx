
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
import { useQueryUiFrame } from '../hooks/useQueryUiFrame';
import { useMaterialComponents } from '~/material/hooks/useMaterialComponents';
import { NotPublished } from '../NotPublished';
import { NotFinieshed } from '../NotFinieshed';
import { useAppParams } from '~/plugin-sdk/contexts/app';

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
  const { uiFrame } = useAppParams()
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

  console.log("呵呵", uiFrame);
  return (
    uiFrame?.schemaJson?.schema ?
      <RunnerContext.Provider value={runnerContextValue}>
        <RouteContext.Provider value={{ menuItem: mentItem, setMenuItem: setMenuItem as any }}>
          <FormProvider form={form}>
            <ExpressionScope value={newExpScope} >
              {
                uiFrame.schemaJson.schema &&
                <SchemaField schema={p(uiFrame?.schemaJson?.schema || {})}>
                </SchemaField>
              }
            </ExpressionScope>
          </FormProvider>
        </RouteContext.Provider>
      </RunnerContext.Provider>
      : <NotFinieshed />
  );
});

export default RunnerEngine