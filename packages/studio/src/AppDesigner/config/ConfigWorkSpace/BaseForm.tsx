import { Form, message } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useShowError } from '../../../hooks/useShowError';
import { useUpsertAppConfig } from '../../../hooks/useUpsertAppConfig';
import { useAppConfig } from '../../../shared/AppRoot/context';
import { PageSelect } from '../../SettingsForm/components/PageSelect';
import "./style.less"

export const BaseLangForm = memo(() => {
  const { t } = useTranslation();
  const appConfig = useAppConfig();
  const [upsert, { loading, error }] = useUpsertAppConfig(
    {
      onCompleted: () => {
        message.success(t("OperateSuccess"));
      }
    }
  );

  useShowError(error);

  const handleOpenChange = useCallback((checked: boolean) => {
    upsert({
      ...appConfig,
      schemaJson: {
        ...appConfig?.schemaJson,
        multiLang: { ...appConfig?.schemaJson?.multiLang, open: checked }
      }
    })
  }, [appConfig, upsert]);

  return (
    <Form
      name="multlang"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 12,
      }}
      autoComplete="off"
    >
      <Form.Item
        label={t("Designer.EntryPage")}
        name="entry"
      >
        <PageSelect />
      </Form.Item>
    </Form>
  );
});
