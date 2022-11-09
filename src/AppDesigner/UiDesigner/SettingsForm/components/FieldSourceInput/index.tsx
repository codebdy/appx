import { observer } from "@formily/reactive-react";
import React, { useCallback, useMemo } from "react";
import "./style.less"
import { Select } from 'antd';
import { useCurrentEntity } from "~/datasource/hooks/useCurrentEntity";
import { TextWidget } from '@designable/react'
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { FieldSourceType, IFieldSource } from "~/datasource/model/IFieldSource";
import { useGetEntity } from "~/datasource/hooks/useGetEntity";
import { isArr } from "@formily/shared";
import { AttributeMeta } from "~/AppDesigner/AppUml/meta";
const { Option, OptGroup } = Select;

export const FieldSourceInput = observer((
  props: {
    mode?: 'multiple' | 'tags',
    value?: IFieldSource | IFieldSource[],
    onChange?: (value?: IFieldSource | IFieldSource[]) => void
  }
) => {
  const { value, mode, onChange, ...other } = props;
  const currentEntity = useCurrentEntity();
  const getEntity = useGetEntity();
  const p = useParseLangMessage();

  const createAttrSource = useCallback((attr: AttributeMeta) => {
    return {
      name: attr.name,
      sourceType: FieldSourceType.Attribute,
      label: attr.label,
      typeUuid: attr.typeUuid,
      typeEntityName: getEntity(attr.typeUuid)?.name,
      dataType: attr.type as any,
    };
  }, [getEntity])

  const handleSingleChange = useCallback((value) => {
    if (!value) {
      onChange(undefined);
      return;
    }
    const attr = currentEntity?.attributes?.find(attr => attr.name === value);
    if (attr) {
      onChange(createAttrSource(attr))
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
        associationType: assoc.associationType,
      })
      return;
    }

    onChange(undefined);
  }, [createAttrSource, currentEntity?.associations, currentEntity?.attributes, currentEntity?.methods, getEntity, onChange])

  const handleMultiChange = useCallback((value) => {
    if (!value) {
      onChange(undefined);
      return;
    }

    if (isArr(value)) {
      onChange(value?.map(child => {
        const attr = currentEntity?.attributes?.find(attr => attr.name === child);
        return attr && createAttrSource(attr);
      }))
    }
    else {
      const attr = currentEntity?.attributes?.find(attr => attr.name === value);
      onChange([createAttrSource(attr)])
    }
  }, [createAttrSource, currentEntity?.attributes, onChange])

  const handleChange = useCallback((value) => {
    if (!onChange) {
      return;
    }

    if (mode === "multiple") {
      handleMultiChange(value);
    } else {
      handleSingleChange(value);
    }
  }, [handleMultiChange, handleSingleChange, mode, onChange])

  const realValue = useMemo(() => {
    if (mode === "multiple") {
      return isArr(value) ? (value as IFieldSource[])?.map(child => child.name) : [];
    } else {
      return (value as IFieldSource)?.name;
    }
  }, [mode, value])

  return (
    <Select allowClear value={realValue} onChange={handleChange} mode={mode} {...other}>
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
        !!currentEntity?.methods?.length && mode !== "multiple" &&
        <OptGroup label={<TextWidget token="SettingComponents.FieldNameSelect.Methods" />}>
          {
            currentEntity.methods?.map(method => {
              return (<Option value={method.name}>{p(method.label) || method.name}</Option>)
            })
          }
        </OptGroup>
      }
      {
        !!currentEntity?.associations?.length && mode !== "multiple" &&
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