import { observer } from "@formily/reactive-react";
import React, { useCallback } from "react";
import "./style.less"
import { Select } from 'antd';
import { useCurrentEntity } from "../../../../datasource/hooks/useCurrentEntity";
import { TextWidget } from '@designable/react'
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage";
import { FieldSourceType, IFieldSource } from "../../../../datasource/model/IFieldSource";
import { useGetEntity } from "../../../../datasource/hooks/useGetEntity";
const { Option, OptGroup } = Select;

export const FieldSourceInput = observer((
  props: {
    value?: IFieldSource,
    onChange?: (value?: IFieldSource) => void
  }
) => {
  const { value, onChange } = props;
  const currentEntity = useCurrentEntity();
  const getEntity = useGetEntity();
  const p = useParseLangMessage();

  const handleChange = useCallback((value) => {
    if (!onChange) {
      return;
    }

    const attr = currentEntity?.attributes?.find(attr => attr.name === value);
    if (attr) {
      onChange({
        name: attr.name,
        sourceType: FieldSourceType.Attribute,
        label: attr.label,
        typeUuid: attr.typeUuid,
        typeEntityName: getEntity(attr.typeUuid)?.name,
        dataType: attr.type as any,
      })
      return;
    }
    const method = currentEntity?.methods?.find(method => method.name === value);
    if (method) {
      onChange({
        name: method.name,
        sourceType: FieldSourceType.Method,
        label: method.label,
        typeUuid: method.typeUuid,
        typeEntityName: getEntity(method.typeUuid)?.name,
      })
      return;
    }

    const assoc = currentEntity?.associations?.find(assoc => assoc.name === value);
    if (assoc) {
      onChange({
        name: assoc.name,
        sourceType: FieldSourceType.Association,
        label: assoc.label,
        typeUuid: assoc.typeUuid,
        typeEntityName: getEntity(assoc.typeUuid)?.name,
      })
      return;
    }

    onChange(undefined);
  }, [currentEntity?.associations, currentEntity?.attributes, currentEntity?.methods, getEntity, onChange])

  return (
    <Select allowClear value={value?.name} onChange={handleChange}>
      {
        !!currentEntity?.attributes?.length &&
        <OptGroup label={<TextWidget token="SettingComponents.FieldNameSelect.Attributes" />}>
          {
            currentEntity.attributes?.map(attr => {
              return (<Option value={attr.name}>{p(attr.label) || attr.name}</Option>)
            })
          }
        </OptGroup>
      }
      {
        !!currentEntity?.methods?.length &&
        <OptGroup label={<TextWidget token="SettingComponents.FieldNameSelect.Methods" />}>
          {
            currentEntity.methods?.map(method => {
              return (<Option value={method.name}>{p(method.label) || method.name}</Option>)
            })
          }
        </OptGroup>
      }
      {
        !!currentEntity?.associations?.length &&
        <OptGroup label={<TextWidget token="SettingComponents.FieldNameSelect.Associations" />}>
          {
            currentEntity.associations?.map(assoc => {
              return (<Option value={assoc.name}>{p(assoc.label) || assoc.name}</Option>)
            })
          }
        </OptGroup>
      }
    </Select >
  )
})