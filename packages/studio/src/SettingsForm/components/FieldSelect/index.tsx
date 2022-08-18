import { observer } from "@formily/reactive-react";
import React, { useCallback } from "react";
import "./style.less"
import { Select } from 'antd';
import { useCurrentEntity } from "../../../datasource/hooks/useCurrentEntity";
import { TextWidget } from '@designable/react'
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";
const { Option, OptGroup } = Select;

export const FieldSelect = observer((
  props: {
    value?: string,
    onChange?: (name?: string) => void
  }
) => {
  const { value, onChange } = props;
  const currentEntity = useCurrentEntity();
  const p = useParseLangMessage();

  const handleChange = useCallback((value) => {
    onChange && onChange(value);
  }, [onChange])

  return (
    <Select value={value} onChange={handleChange}>
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
    </Select>
  )
})