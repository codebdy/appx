import React, { useCallback } from "react";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeClass } from "../hooks/useChangeClass";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { Form, Input, Switch } from "antd";
import { getLocalMessage } from "../../locales/getLocalMessage";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const serviceId = useSelectedAppId();
  const changeClass = useChangeClass(serviceId);
  const handleChange = useCallback((form) => {
    changeClass({ ...cls, ...form });
  }, [changeClass, cls])

  return (
    <div className="property-pannel">
      <Form
        name="classForm"
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={cls}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={getLocalMessage("model.Name")}
          name="name"
        >
          <Input />
        </Form.Item>

        {cls.stereoType !== StereoType.Enum &&
          cls.stereoType !== StereoType.ValueObject &&
          (
            <Form.Item
              name="root"
              valuePropName="checked"
              label={getLocalMessage("model.RootNode")}
            >
              <Switch disabled={cls.stereoType === StereoType.Service} />
            </Form.Item>
          )}
        <Form.Item
          label={getLocalMessage("model.Description")}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};
