import { Form, Input, Switch } from 'antd';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
        <Input />
      </Form.Item>
      <Form.Item
        label={t("Config.MultiLang.Resources")}
        name="langs"
      >
        <Input />
      </Form.Item>

    </Form>
  );
});

export default MultLangForm;