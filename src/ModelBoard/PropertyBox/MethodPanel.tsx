import React, { useCallback, useState } from "react";
import { MethodMeta } from "../meta/MethodMeta";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeMethod } from "../hooks/useChangeMethod";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { useSelectedAppUuid } from "../../plugin-sdk/contexts/appRoot";
import { Form, Input } from "antd";
import { MultiLangInput } from "../../plugins/inputs/components/pc/MultiLangInput/view";
import { useTranslation } from "react-i18next";
import { MethodTypeInput } from "./MethodTypeInput";

export const MethodPanel = (props: { method: MethodMeta; cls: ClassMeta }) => {
  const { method, cls } = props;
  const [nameError, setNameError] = useState<string>();
  const serviceId = useSelectedAppUuid();
  const changeMethod = useChangeMethod(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);
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
          <MultiLangInput inline title={t("Label")} />
        </Form.Item>
        <MethodTypeInput method={method} />
      </Form>
    </div>
  );
};
