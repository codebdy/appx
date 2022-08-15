import React, { useMemo } from "react";
import { Form, Select } from "antd";
import { memo } from "react";
import { useEntities } from "../hooks/useEntities";
import { useEnums } from "../hooks/useEnums";
import { useValueObjects } from "../hooks/useValueObjects";
import { Type } from "../meta/Type";
import { useTranslation } from "react-i18next";
import { AttributeMeta } from "../meta/AttributeMeta";
import { CONST_ID } from "../meta/Meta";
import { useSelectedAppUuid } from "../../shared/AppRoot/context";
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
          label={t("ModelBoard.DataType")}
          name="type"
        >
          <Select disabled={isId}>
            <Option value={Type.ID}>ID</Option>
            <Option value={Type.Int}>Int</Option>
            <Option value={Type.Float}>Float</Option>
            <Option value={Type.Boolean}>Boolean</Option>
            <Option value={Type.String}>String</Option>
            <Option value={Type.Date}>Date</Option>
            <Option value={Type.Enum}>{t("ModelBoard.Enum")}</Option>
            <Option value={Type.JSON}>JSON</Option>
            <Option value={Type.ValueObject}>{t("ModelBoard.ValueClass")}</Option>
            <Option value={Type.Entity}>{t("ModelBoard.Entity")}</Option>
            <Option value={Type.File}>{t("File")}</Option>
            <Option value={Type.IDArray}>ID {t("ModelBoard.Array")}</Option>
            <Option value={Type.IntArray}>Int {t("ModelBoard.Array")}</Option>
            <Option value={Type.FloatArray}>Float {t("ModelBoard.Array")}</Option>
            <Option value={Type.StringArray}>String {t("ModelBoard.Array")}</Option>
            <Option value={Type.DateArray}>Date {t("ModelBoard.Array")}</Option>
            <Option value={Type.EnumArray}>
              {t("ModelBoard.Enum")}
              {t("ModelBoard.Array")}
            </Option>
            <Option value={Type.ValueObjectArray}>
              {t("ModelBoard.ValueClass")}
              {t("ModelBoard.Array")}
            </Option>
            <Option value={Type.EntityArray}>
              {t("ModelBoard.Entity")}
              {t("ModelBoard.Array")}
            </Option>
          </Select>
        </Form.Item>
        {(attribute.type === Type.Enum ||
          attribute.type === Type.EnumArray) && (
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
        {(attribute.type === Type.ValueObject ||
          attribute.type === Type.ValueObjectArray) && (
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
        {(attribute.type === Type.Entity ||
          attribute.type === Type.EntityArray) && (
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
