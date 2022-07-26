import React, { useCallback } from "react";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeClass } from "../hooks/useChangeClass";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { Checkbox, Form, Input, Switch } from "antd";
import { getLocalMessage } from "../../locales/getLocalMessage";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const serviceId = useSelectedAppId();

  const changeClass = useChangeClass(serviceId);

  const handleNameChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      const name = event.target.value.trim();
      changeClass({ ...cls, name: name });
    },
    [changeClass, cls]
  );

  const handlePartialNameChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      const partialName = event.target.value.trim();
      changeClass({ ...cls, partialName: partialName });
    },
    [changeClass, cls]
  );

  const handleRootChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      changeClass({ ...cls, root: event.target.checked });
    },
    [changeClass, cls]
  );

  // const handleGqlInterfaceChange = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     changeClass({ ...cls, gqlInterface: event.target.checked });
  //   },
  //   [changeClass, cls]
  // );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeClass({ ...cls, description: event.target.value });
    },
    [changeClass, cls]
  );

  return (
    <div className="property-pannel">
      <Form
        name="classForm"
        colon = {false}
        labelAlign = "left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        autoComplete="off"
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
              <Switch />
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
