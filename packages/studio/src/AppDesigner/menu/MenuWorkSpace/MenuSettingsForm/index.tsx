import { Form, Input } from 'antd';
import React, { memo } from 'react';

const MenuSettingsForm = memo(() => {
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
        labelAlign = "left"
        initialValues={{

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </div>
  );
});

export default MenuSettingsForm;