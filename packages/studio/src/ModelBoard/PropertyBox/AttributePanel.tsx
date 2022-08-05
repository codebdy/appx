import React, { useCallback, useMemo } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { Type } from "../meta/Type";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeAttribute } from "../hooks/useChangeAttribute";
import { CONST_ID } from "../meta/Meta";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { Form, Input, Select, Switch } from "antd";
import { useSelectedAppUuid } from "../context";
const { Option } = Select;

export const AttributePanel = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;
  const serviceId = useSelectedAppUuid();
  const changeAttribute = useChangeAttribute(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

  const handleChange = useCallback((form) => {
    changeAttribute(
      {
        ...attribute,
        ...form,
        typeLabel: getTypeLabel(attribute.type),
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
            <Form.Item
              label={t("model.DataType")}
              name="type"
            >
              <Select disabled={isId}>
                <Option value={Type.ID}>ID</Option>
                <Option value={Type.Int}>Int</Option>
                <Option value={Type.Float}>Float</Option>
                <Option value={Type.Boolean}>Boolean</Option>
                <Option value={Type.String}>String</Option>
                <Option value={Type.Date}>Date</Option>
                <Option value={Type.Enum}>{t("model.Enum")}</Option>
                <Option value={Type.JSON}>JSON</Option>
                <Option value={Type.ValueObject}>{t("model.ValueClass")}</Option>
                <Option value={Type.Entity}>{t("model.Entity")}</Option>
                <Option value={Type.File}>{t("File")}</Option>
                <Option value={Type.IDArray}>ID {t("model.Array")}</Option>
                <Option value={Type.IntArray}>Int {t("model.Array")}</Option>
                <Option value={Type.FloatArray}>Float {t("model.Array")}</Option>
                <Option value={Type.StringArray}>String {t("model.Array")}</Option>
                <Option value={Type.DateArray}>Date {t("model.Array")}</Option>
                <Option value={Type.EnumArray}>
                  {t("model.Enum")}
                  {t("model.Array")}
                </Option>
                <Option value={Type.ValueObjectArray}>
                  {t("model.ValueClass")}
                  {t("model.Array")}
                </Option>
                <Option value={Type.EntityArray}>
                  {t("model.Entity")}
                  {t("model.Array")}
                </Option>
              </Select>
            </Form.Item>
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
