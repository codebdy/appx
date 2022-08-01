import { Form, FormInstance, Input } from "antd";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React from "react";
import { memo } from "react";

const CategoryForm = memo((
  props:{
    form :FormInstance<any>
  }
) => {
  const {form} = props;

  return (
    <Form
      name="eidtCategory"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      form={form}
      autoComplete="off"
    >
      <Form.Item
        label={getLocalMessage("pages.CagegoryName")}
        name="name"
        rules={[{ required: true, message: getLocalMessage("Required") }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
})

export default CategoryForm;