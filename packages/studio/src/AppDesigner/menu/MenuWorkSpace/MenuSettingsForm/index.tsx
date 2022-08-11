import { Form, Input } from 'antd';
import IconInput from '../../../../shared/icon/IconInput';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const MenuSettingsForm = memo(() => {
  const { t } = useTranslation();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: "16px" }}>
      <Form
        name="menu-item-settings"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        labelAlign="left"
        initialValues={{

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t("Menu.Title")}
          name="title"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("Menu.Icon")}
          name="icon"
        >
          <IconInput />
        </Form.Item>
      </Form>
    </div>
  );
});

export default MenuSettingsForm;