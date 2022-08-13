import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { Type } from "../meta/Type";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeAttribute } from "../hooks/useChangeAttribute";
import { CONST_ID } from "../meta/Meta";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { Form, Input, Switch } from "antd";
import { useSelectedAppUuid } from "../context";
import { useTranslation } from "react-i18next";
import { TypeInput } from "./TypeInput";

export const AttributePanel = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;
  const [nameError, setNameError] = useState<string>();
  const serviceId = useSelectedAppUuid();
  const changeAttribute = useChangeAttribute(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);
  const { t } = useTranslation();
  const [form] = Form.useForm()
  useEffect(() => form.setFieldsValue({ ...attribute }), [attribute, form])

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

  const handleChange = useCallback((form) => {
    const errMsg = changeAttribute(
      {
        ...attribute,
        ...form,
        typeLabel: getTypeLabel(form.type || attribute.type, form.typeUuid),
      },
      cls
    );
    setNameError(errMsg)
  }, [changeAttribute, attribute, getTypeLabel, cls])

  return (
    <div className="property-pannel">
      <Form
        name="attributeForm"
        form = {form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={attribute}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("ModelBoard.Name")}
          name="name"
          validateStatus={nameError ? "error" : undefined}
          help={nameError}
        >
          <Input disabled={isId} />
        </Form.Item>

        {cls.stereoType !== StereoType.Enum && (
          <>
            <TypeInput attribute={attribute} />
            {
              !isId &&
              <>
                <Form.Item
                  label={t("ModelBoard.Nullable")}
                  name="nullable"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("ModelBoard.Unique")}
                  name="unique"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("ModelBoard.Index")}
                  name="index"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("ModelBoard.HiddenField")}
                  name="hidden"
                >
                  <Switch />
                </Form.Item>
              </>
            }
            {
              attribute.type === Type.Date &&
              <>
                <Form.Item
                  label={t("ModelBoard.CreateDate")}
                  name="createDate"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("ModelBoard.UpdateDate")}
                  name="updateDate"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("ModelBoard.DeleteDate")}
                  name="deleteDate"
                >
                  <Switch />
                </Form.Item>
              </>
            }
            {
              !isId &&
              <>
                <Form.Item
                  label={t("ModelBoard.DefaultValue")}
                  name="default"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("Length")}
                  name="length"
                >
                  <Input type={"number"} />
                </Form.Item>
              </>
            }

          </>
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
