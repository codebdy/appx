
import { memo, useState } from 'react';
import React from 'react';
import { IMenuItem } from '@rxdrag/plugin-sdk/model/IMenuNode';
import { FormItem } from "@formily/antd";
import { useMemo } from "react";
import { useParseLangSchema } from "../../AppDesigner/hooks/useParseLangSchema";
import { IUser } from "~/enthooks/hooks/useQueryMe";
import { useMe } from "@rxdrag/plugin-sdk/contexts/login";
import { createSchemaField, ExpressionScope, FormProvider } from '@formily/react';
import { createForm } from '@formily/core';
import { RouteContext, useAppParams } from '~/plugin-sdk/contexts/app';
import { NotReady } from '../NotReady';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const p = useParseLangSchema();
  const { uiFrame, components } = useAppParams()
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
    uiFrame?.schemaJson?.schema ?
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
      : <NotReady title={t("NotFinishedTip")} />
  );
});

export default RunnerEngine