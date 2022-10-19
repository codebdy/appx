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
import { useEdittingAppUuid } from "~/hooks/useEdittingAppUuid";
const { Option } = Select;

export const AttributeTypeInput = memo(
  (
    props: {
      attribute: AttributeMeta
    }
  ) => {
    const { attribute } = props;
    const appUuid = useEdittingAppUuid();
    const enums = useEnums(appUuid);
    const valueObjects = useValueObjects(appUuid);
    const entities = useEntities(appUuid);
    const { t } = useTranslation();
    const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

    return (
      <>
        <Form.Item
          label={t("Type")}
          name="type"
        >
          <Select disabled={isId}>
            <Option value={Types.ID}>ID</Option>
            <Option value={Types.Int}>Int</Option>
            <Option value={Types.Float}>Float</Option>
            <Option value={Types.Boolean}>Boolean</Option>
            <Option value={Types.String}>String</Option>
            <Option value={Types.Date}>Date</Option>
            <Option value={Types.Enum}>{t("AppUml.Enum")}</Option>
            <Option value={Types.JSON}>JSON</Option>
            <Option value={Types.ValueObject}>{t("AppUml.ValueClass")}</Option>
            <Option value={Types.Entity}>{t("AppUml.Entity")}</Option>
            <Option value={Types.File}>{t("File")}</Option>
            <Option value={Types.IDArray}>ID {t("AppUml.Array")}</Option>
            <Option value={Types.IntArray}>Int {t("AppUml.Array")}</Option>
            <Option value={Types.FloatArray}>Float {t("AppUml.Array")}</Option>
            <Option value={Types.StringArray}>String {t("AppUml.Array")}</Option>
            <Option value={Types.DateArray}>Date {t("AppUml.Array")}</Option>
            <Option value={Types.EnumArray}>
              {t("AppUml.Enum")}
              {t("AppUml.Array")}
            </Option>
            <Option value={Types.ValueObjectArray}>
              {t("AppUml.ValueClass")}
              {t("AppUml.Array")}
            </Option>
            <Option value={Types.EntityArray}>
              {t("AppUml.Entity")}
              {t("AppUml.Array")}
            </Option>
          </Select>
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
              label={t("AppUml.ValueObject")}
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
