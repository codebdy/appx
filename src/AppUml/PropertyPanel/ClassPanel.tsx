import React, { useCallback, useEffect, useState } from "react";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeClass } from "../hooks/useChangeClass";
import { Form, Input, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "../../plugins/inputs/components/pc/MultiLangInput/view";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { ScriptInput } from "./ScriptInput/ScriptInput";

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const [nameError, setNameError] = useState<string>();
  const appUuid = useEdittingAppUuid();
  const changeClass = useChangeClass(appUuid);
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
          label={t("AppUml.Name")}
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
          <MultiLangInput inline title={t("Label")} />
        </Form.Item>
        {cls.stereoType !== StereoType.Enum &&
          cls.stereoType !== StereoType.ValueObject &&
          (
            <Form.Item
              name="root"
              valuePropName="checked"
              label={t("AppUml.RootNode")}
            >
              <Switch disabled={cls.stereoType === StereoType.Service} />
            </Form.Item>
          )
        }
        {cls.stereoType === StereoType.Entity &&
          (
            <Form.Item
              name="enableVersion"
              valuePropName="checked"
              label={t("AppUml.EnableVersion")}
            >
              <Switch />
            </Form.Item>
          )
        }
        {
          cls.stereoType === StereoType.ThirdParty &&
          <>
            <Form.Item
              label={t("AppUml.QueryScript")}
              name="queryScript"
            >
              <ScriptInput />
            </Form.Item>
            <Form.Item
              label={t("AppUml.MutationScript")}
              name="mutationScript"
            >
              <ScriptInput />
            </Form.Item>
          </>
        }
        <Form.Item
          label={t("AppUml.Description")}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};
