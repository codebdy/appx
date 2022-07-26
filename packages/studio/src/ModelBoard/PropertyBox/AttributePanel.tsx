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
          <Input />
        </Form.Item>

        {cls.stereoType !== StereoType.Enum && (
          <>
            <Form.Item
              label={getLocalMessage("model.DataType")}
              name="type"
            >
              <Select>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled">Disabled</Option>
                <Option value="Yiminghe">yiminghe</Option>
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
