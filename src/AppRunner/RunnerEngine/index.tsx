
import { memo, useState } from 'react';
import React from 'react';
import { useShowError } from '../../hooks/useShowError';
import { Spin } from 'antd';
import { useAppParams } from '../../plugin-sdk/contexts/appRoot';
import { useQueryMenu } from '../../shared/AppRoot/hooks/useQueryMenu';
import { RouteContext, RunnerContext } from '../../plugin-sdk/contexts/runner';
import { IMenuItem } from '../../model/IMenuNode';
import { FormItem } from "@formily/antd";
import { useMemo } from "react";
import { useParseLangSchema } from "../../hooks/useParseLangSchema";
import { ID } from "../../shared";
import { useQueryPageWithCache } from "../hooks/useQueryPageWithCache";
import { IUser } from "../../enthooks/hooks/useQueryMe";
import { useMe } from "../../plugin-sdk/contexts/login";
import { createSchemaField, ExpressionScope, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import { components } from '../PCRunner/components';

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
  const { device } = useAppParams();
  const { menu, error, loading } = useQueryMenu();
  useShowError(error);
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

  return (
    <RunnerContext.Provider value={{ menu }}>
      <RouteContext.Provider value={{ menuItem: mentItem, setMenuItem: setMenuItem as any }}>
        <Spin spinning={loading}>
          <FormProvider form={form}>
            <ExpressionScope value={newExpScope} >
              {
                page?.schemaJson?.schema &&
                <SchemaField schema={p(JSON.parse(JSON.stringify(page?.schemaJson?.schema || "{}")))}>
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