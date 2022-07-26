import React, { useCallback, useMemo } from "react";
import { AttributeMeta } from "../meta/AttributeMeta";
import { Type } from "../meta/Type";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { useChangeAttribute } from "../hooks/useChangeAttribute";
import { useSelectedAppId } from "../hooks/useSelectedAppId";
import { CONST_ID } from "../meta/Meta";
import { useGetTypeLabel } from "../hooks/useGetTypeLabel";
import { getLocalMessage } from "../../locales/getLocalMessage";
import { Form, Input, Select } from "antd";
const { Option } = Select;

export const AttributePanel = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;
  const serviceId = useSelectedAppId();
  const changeAttribute = useChangeAttribute(serviceId);
  const getTypeLabel = useGetTypeLabel(serviceId);

  const handleStringChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<{ value: string }>) => {
      changeAttribute(
        {
          ...attribute,
          [prop]: event.target.value.trim(),
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  //默认值以后要改成一个单独控件
  const handleDefaultChange = useCallback(
    (event: React.ChangeEvent<{ value: string }>) => {
      changeAttribute(
        {
          ...attribute,
          default: event.target.value === "" ? undefined : event.target.value,
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  //不设置allValues， 类型改变会清空所有旧设置，保留nullable
  const handleTypeChange = useCallback(
    (type: Type) => {
      changeAttribute(
        {
          ...attribute,
          type,
          nullable: attribute.nullable,
          typeUuid: undefined,
          typeLabel: getTypeLabel(type),
        },
        cls
      );
    },
    [changeAttribute, attribute, getTypeLabel, cls]
  );

  const handleValueObjectChange = useCallback(
    (uuid: string) => {
      changeAttribute(
        {
          ...attribute,
          typeUuid: uuid,
          typeLabel: getTypeLabel(attribute.type, uuid),
        },
        cls
      );
    },
    [changeAttribute, attribute, getTypeLabel, cls]
  );

  const handleBooleanChange = useCallback(
    (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
      changeAttribute(
        {
          ...attribute,
          [prop]: event.target.checked,
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked ? false : undefined;
      changeAttribute(
        {
          ...attribute,
          select: value,
        },
        cls
      );
    },
    [changeAttribute, attribute, cls]
  );

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

  const handleChange = useCallback((form) => {

  }, [])

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
          label={getLocalMessage("model.Name")}
          name="name"
        >
          <Input  disabled = {isId} />
        </Form.Item>

        {cls.stereoType !== StereoType.Enum && (
          <>
            <Form.Item
              label={getLocalMessage("model.DataType")}
              name="type"
            >
              <Select disabled = {isId}>
                <Option value={Type.ID}>ID</Option>
                <Option value={Type.Int}>Int</Option>
                <Option value={Type.Float}>Float</Option>
                <Option value={Type.Boolean}>Boolean</Option>
                <Option value={Type.String}>String</Option>
                <Option value={Type.Date}>Date</Option>
                <Option value={Type.Enum}>{getLocalMessage("model.Enum")}</Option>
                <Option value={Type.JSON}>JSON</Option>
                <Option value={Type.ValueObject}>{getLocalMessage("model.ValueClass")}</Option>
                <Option value={Type.Entity}>{getLocalMessage("model.Entity")}</Option>
                <Option value={Type.File}>{getLocalMessage("File")}</Option>
                <Option value={Type.IDArray}>ID {getLocalMessage("model.Array")}</Option>
                <Option value={Type.IntArray}>Int {getLocalMessage("model.Array")}</Option>
                <Option value={Type.FloatArray}>Float {getLocalMessage("model.Array")}</Option>
                <Option value={Type.StringArray}>String {getLocalMessage("model.Array")}</Option>
                <Option value={Type.DateArray}>Date {getLocalMessage("model.Array")}</Option>
                <Option value={Type.EnumArray}>
                  {getLocalMessage("model.Enum")}
                  {getLocalMessage("model.Array")}
                </Option>
                <Option value={Type.ValueObjectArray}>
                  {getLocalMessage("model.ValueClass")}
                  {getLocalMessage("model.Array")}
                </Option>
                <Option value={Type.EntityArray}>
                  {getLocalMessage("model.Entity")}
                  {getLocalMessage("model.Array")}
                </Option>
              </Select>
            </Form.Item>
          </>
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
