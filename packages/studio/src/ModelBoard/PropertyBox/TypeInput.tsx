import React, { useMemo } from "react";
import { Form, Select } from "antd";
import { memo } from "react";
import { useSelectedAppUuid } from "../context";
import { useEntities } from "../hooks/useEntities";
import { useEnums } from "../hooks/useEnums";
import { useValueObjects } from "../hooks/useValueObjects";
import { Type } from "../meta/Type";
import { useTranslation } from "react-i18next";
import { AttributeMeta } from "../meta/AttributeMeta";
import { CONST_ID } from "../meta/Meta";
const { Option } = Select;

export const TypeInput = memo(
  (
    props: {
      attribute: AttributeMeta
    }
  ) => {
    const { attribute } = props;
    const appUuid = useSelectedAppUuid();
    const enums = useEnums(appUuid);
    const valueObjects = useValueObjects(appUuid);
    const entities = useEntities(appUuid);
    const { t } = useTranslation();
    const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

    return (
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
        {(attribute.type === Type.Enum ||
          attribute.type === Type.EnumArray) && (
            <Form.Item
              label={t("model.EnumClass")}
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
        {(attribute.type === Type.ValueObject ||
          attribute.type === Type.ValueObjectArray) && (
            <Form.Item
              label={t("model.ValueObject")}
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
        {(attribute.type === Type.Entity ||
          attribute.type === Type.EntityArray) && (
            <Form.Item
              label={t("model.EntityClass")}
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
