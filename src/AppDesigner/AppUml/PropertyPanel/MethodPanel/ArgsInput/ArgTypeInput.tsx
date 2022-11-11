import { Select } from "antd"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { Type, Types } from "~/AppDesigner/AppUml/meta"
const { Option } = Select;

export const ArgTypeInput = memo((
  props: {
    uuid: string,
    type: Type,
    typeUuid?: string,
    onTypeChange: (uuid: string, type: Type, typeUuid?: string) => void,
  }
) => {
  const { uuid, type, typeUuid, onTypeChange } = props;
  const { t } = useTranslation();

  return (
    <div style={{ display: "flex" }}>
      <Select
        style={{ width: 150 }}
        value={type}
        onChange={(value) => onTypeChange(uuid, value)}
      >
        <Option value={Types.ID}>ID</Option>
        <Option value={Types.Int}>Int</Option>
        <Option value={Types.Float}>Float</Option>
        <Option value={Types.Boolean}>Boolean</Option>
        <Option value={Types.String}>String</Option>
        <Option value={Types.Date}>Date</Option>
        <Option value={Types.JSON}>JSON</Option>
        <Option value={Types.IDArray}>ID {t("AppUml.Array")}</Option>
        <Option value={Types.IntArray}>Int {t("AppUml.Array")}</Option>
        <Option value={Types.FloatArray}>Float {t("AppUml.Array")}</Option>
        <Option value={Types.StringArray}>String {t("AppUml.Array")}</Option>
        <Option value={Types.DateArray}>Date {t("AppUml.Array")}</Option>
      </Select>
      <Select
        style={{ width: 150, marginLeft: 16 }}
        value={type}
        onChange={(value) => onTypeChange(uuid, value)}
      >
        <Option value={Types.ID}>ID</Option>
        <Option value={Types.Int}>Int</Option>
        <Option value={Types.Float}>Float</Option>
        <Option value={Types.Boolean}>Boolean</Option>
        <Option value={Types.String}>String</Option>
        <Option value={Types.Date}>Date</Option>
        <Option value={Types.JSON}>JSON</Option>
        <Option value={Types.IDArray}>ID {t("AppUml.Array")}</Option>
        <Option value={Types.IntArray}>Int {t("AppUml.Array")}</Option>
        <Option value={Types.FloatArray}>Float {t("AppUml.Array")}</Option>
        <Option value={Types.StringArray}>String {t("AppUml.Array")}</Option>
        <Option value={Types.DateArray}>Date {t("AppUml.Array")}</Option>
      </Select>
    </div>
  )
})