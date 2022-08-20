import React, { useCallback, useEffect, useState } from "react";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeClass } from "../hooks/useChangeClass";
import { Form, Input, Switch } from "antd";
import { useTranslation } from "react-i18next";
import MultiLangInput from "../../components/pc/form/MultiLangInput";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const [nameError, setNameError] = useState<string>();
  const serviceId = useSelectedAppUuid();
  const changeClass = useChangeClass(serviceId);
  const { t } = useTranslation();
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields();
  }, [form, cls.uuid])

  useEffect(
    () => {
      form.setFieldsValue({ ...cls });
    },
    [cls, form]
  )
  const handleChange = useCallback((formData) => {
    const errMsg = changeClass({ ...cls, ...formData });
    setNameError(errMsg)
  }, [changeClass, cls])

  return (
    <div className="property-pannel">
      <Form
        name="classForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={cls}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("ModelBoard.Name")}
          name="name"
          validateStatus={nameError ? "error" : undefined}
          help={nameError}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Label")}
          name="label"
        >
          <MultiLangInput inline title={t("Label")}/>
        </Form.Item>
        {cls.stereoType !== StereoType.Enum &&
          cls.stereoType !== StereoType.ValueObject &&
          (
            <Form.Item
              name="root"
              valuePropName="checked"
              label={t("ModelBoard.RootNode")}
            >
              <Switch disabled={cls.stereoType === StereoType.Service} />
            </Form.Item>
          )}
        <Form.Item
          label={t("ModelBoard.Description")}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};
