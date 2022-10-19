import React, { memo, useCallback, useState } from "react";
import { MethodMeta, MethodOperateType } from "../../meta/MethodMeta";
import { ClassMeta } from "../../meta/ClassMeta";
import { useChangeMethod } from "../../hooks/useChangeMethod";
import { useGetTypeLabel } from "../../hooks/useGetTypeLabel";
import { Form, Input, Radio } from "antd";
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view";
import { useTranslation } from "react-i18next";
import { MethodTypeInput } from "./MethodTypeInput";
import { useEdittingAppUuid } from "~/hooks/useEdittingAppUuid";
import { ScriptInput } from "../ScriptInput/ScriptInput";
import { ArgsInput } from "./ArgsInput/ArgsInput";

export const MethodPanel = memo((props: { method: MethodMeta; cls: ClassMeta }) => {
  const { method, cls } = props;
  const [nameError, setNameError] = useState<string>();
  const appUuid = useEdittingAppUuid();
  const changeMethod = useChangeMethod(appUuid);
  const getTypeLabel = useGetTypeLabel(appUuid);
  const { t } = useTranslation();
  const [form] = Form.useForm()

  const handleChange = useCallback((form) => {
    const errMsg = changeMethod(
      {
        ...method,
        ...form,
        typeLabel: getTypeLabel(form.type || method.type, form.typeUuid),
      },
      cls
    );
    setNameError(errMsg)
  }, [changeMethod, method, getTypeLabel, cls])

  return (
    <div className="property-pannel">
      <Form
        name="attributeForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={method}
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
        <Form.Item
          label={t("AppUml.OperateType")}
          name="operateType"
        >
          <Radio.Group
            optionType="button"
            options={[
              {
                value: MethodOperateType.Query,
                label: t("AppUml.Query"),
              },
              {
                value: MethodOperateType.Mutation,
                label: t("AppUml.Mutation"),
              }
            ]}
          />
        </Form.Item>
        <MethodTypeInput method={method} />
        <Form.Item
          label={t("AppUml.Arguments")}
          name="args"
        >
          <ArgsInput />
        </Form.Item>
        <Form.Item
          label={t("AppUml.Script")}
          name="script"
        >
          <ScriptInput />
        </Form.Item>
      </Form>
    </div>
  );
});
