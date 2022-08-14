import { Form, message, Switch } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useShowError } from '../../hooks/useShowError';
import { useUpsertAppConfig } from '../../hooks/useUpsertAppConfig';
import { useAppConfig } from '../../shared/AppRoot/context/config';
import LangResourceEditor from './LangResourceEditor';
import LangSelect from './LangSelect';
import "./style.less"

const MultLangForm = memo(() => {
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
        label={t("Config.MultiLang.Open")}
        name="open"
      >
        <Switch
          checked={appConfig?.schemaJson?.multiLang?.open}
          loading={loading}
          onChange={handleOpenChange}
        />
      </Form.Item>

      <Form.Item
        label={t("Config.MultiLang.Langs")}
        name="langs"
      >
        <LangSelect />
      </Form.Item>
      <Form.Item
        label={t("Config.MultiLang.Resources")}
        name="langs"
      >
        <LangResourceEditor />
      </Form.Item>

    </Form>
  );
});

export default MultLangForm;