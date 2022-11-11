import React, { useMemo } from "react";
import { Form, Select } from "antd";
import { memo } from "react";
import { useEntities } from "../hooks/useEntities";
import { useEnums } from "../hooks/useEnums";
import { useValueObjects } from "../hooks/useValueObjects";
import { Types } from "../meta/Type";
import { useTranslation } from "react-i18next";
import { AttributeMeta } from "../meta/AttributeMeta";
import { CONST_ID } from "../meta/Meta";
import { useEdittingAppId } from "~/AppDesigner/hooks/useEdittingAppUuid";
import { TypeSelect } from "./TypeSelect";
const { Option } = Select;

export const AttributeTypeInput = memo(
  (
    props: {
      attribute: AttributeMeta
    }
  ) => {
    const { attribute } = props;
    const appId = useEdittingAppId();
    const enums = useEnums(appId);
    const valueObjects = useValueObjects(appId);
    const entities = useEntities(appId);
    const { t } = useTranslation();
    const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

    return (
      <>
        <Form.Item
          label={t("Type")}
          name="type"
        >
          <TypeSelect disabled={isId}></TypeSelect>
        </Form.Item>
        {(attribute.type === Types.Enum ||
          attribute.type === Types.EnumArray) && (
            <Form.Item
              label={t("AppUml.EnumClass")}
              name="typeUuid"
            >
              <Select>
                <Option key="" value="">
                  <em>None</em>
                </Option>
                {enums.map((enumEntity) => {
                  return (
                    <Option key={enumEntity.uuid} value={enumEntity.uuid}>{enumEntity.name}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
        {(attribute.type === Types.ValueObject ||
          attribute.type === Types.ValueObjectArray) && (
            <Form.Item
              label={t("AppUml.ValueClass")}
              name="typeUuid"
            >
              <Select>
                <Option key="" value="">
                  <em>None</em>
                </Option>
                {valueObjects.map((interfaceEntity) => {
                  return (
                    <Option key={interfaceEntity.uuid} value={interfaceEntity.uuid}>{interfaceEntity.name}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
        {(attribute.type === Types.Entity ||
          attribute.type === Types.EntityArray) && (
            <Form.Item
              label={t("AppUml.EntityClass")}
              name="typeUuid"
            >
              <Select>
                <Option key="" value="">
                  <em>None</em>
                </Option>
                {entities.map((entity) => {
                  return (
                    <Option key={entity.uuid} value={entity.uuid}>{entity.name}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
      </>
    );
  }
);
