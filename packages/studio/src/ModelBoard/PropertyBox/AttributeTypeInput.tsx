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
import { useSelectedAppUuid } from "../../shared/AppRoot/context";
const { Option } = Select;

export const AttributeTypeInput = memo(
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
          label={t("ModelBoard.DataType")}
          name="type"
        >
          <Select disabled={isId}>
            <Option value={Types.ID}>ID</Option>
            <Option value={Types.Int}>Int</Option>
            <Option value={Types.Float}>Float</Option>
            <Option value={Types.Boolean}>Boolean</Option>
            <Option value={Types.String}>String</Option>
            <Option value={Types.Date}>Date</Option>
            <Option value={Types.Enum}>{t("ModelBoard.Enum")}</Option>
            <Option value={Types.JSON}>JSON</Option>
            <Option value={Types.ValueObject}>{t("ModelBoard.ValueClass")}</Option>
            <Option value={Types.Entity}>{t("ModelBoard.Entity")}</Option>
            <Option value={Types.File}>{t("File")}</Option>
            <Option value={Types.IDArray}>ID {t("ModelBoard.Array")}</Option>
            <Option value={Types.IntArray}>Int {t("ModelBoard.Array")}</Option>
            <Option value={Types.FloatArray}>Float {t("ModelBoard.Array")}</Option>
            <Option value={Types.StringArray}>String {t("ModelBoard.Array")}</Option>
            <Option value={Types.DateArray}>Date {t("ModelBoard.Array")}</Option>
            <Option value={Types.EnumArray}>
              {t("ModelBoard.Enum")}
              {t("ModelBoard.Array")}
            </Option>
            <Option value={Types.ValueObjectArray}>
              {t("ModelBoard.ValueClass")}
              {t("ModelBoard.Array")}
            </Option>
            <Option value={Types.EntityArray}>
              {t("ModelBoard.Entity")}
              {t("ModelBoard.Array")}
            </Option>
          </Select>
        </Form.Item>
        {(attribute.type === Types.Enum ||
          attribute.type === Types.EnumArray) && (
            <Form.Item
              label={t("ModelBoard.EnumClass")}
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
              label={t("ModelBoard.ValueObject")}
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
              label={t("ModelBoard.EntityClass")}
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
