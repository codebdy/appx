import React, { useCallback, useMemo } from "react";
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
  const serviceId = useSelectedAppUuid();
  const changeAttribute = useChangeAttribute(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);
  const { t } = useTranslation();

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

  const handleChange = useCallback((form) => {
    changeAttribute(
      {
        ...attribute,
        ...form,
        typeLabel: getTypeLabel(attribute.type, attribute.uuid),
      },
      cls
    )
  }, [changeAttribute, attribute, getTypeLabel, cls])

  return (
    <div className="property-pannel">
      <Form
        name="attributeForm"
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={attribute}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("model.Name")}
          name="name"
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
                  label={t("model.Nullable")}
                  name="nullable"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("model.Unique")}
                  name="unique"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("model.Index")}
                  name="index"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("model.HiddenField")}
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
                  label={t("model.CreateDate")}
                  name="createDate"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("model.UpdateDate")}
                  name="updateDate"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("model.DeleteDate")}
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
                  label={t("model.DefaultValue")}
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
          label={t("model.Description")}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};
