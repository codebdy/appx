import { Form, Switch } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import LangResourceEditor from './LangResourceEditor';
import LangSelect from './LangSelect';
import "./style.less"

const MultLangForm = memo(() => {
  const { t } = useTranslation();

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
        <Switch defaultChecked />
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