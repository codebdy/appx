import { observer } from "@formily/reactive-react"
import { Input } from "antd"
import React, { useCallback, useMemo } from "react"
import { useFieldSchema } from "@formily/react"
import { IFieldSource } from "packages/studio/src/datasource/model/IFieldSource"
import { isArr } from "@formily/shared"

export interface ISearchText {
  isFuzzy?: boolean,
  keyword?: string,
  fields?: string[],
  isSearchText: true,
}

export interface ISearchInput {
  isFuzzy?: boolean,
  value?: ISearchText,
  onChange?: (value?: ISearchText) => void,
}

export const SearchInput = observer((props: ISearchInput) => {
  const { isFuzzy, value, onChange, ...other } = props;

  const fieldSchema = useFieldSchema();

  const fields = useMemo(() => {
    const fieldSource = fieldSchema?.["x-field-source"];
    return isArr(fieldSource)
      ? (fieldSource as IFieldSource[]).map(subField => subField.name)
      : ((fieldSource as IFieldSource)?.name && [(fieldSource as IFieldSource).name])
  }, [fieldSchema])

  const handleChange = useCallback((event?: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange({
      isFuzzy,
      keyword: event.target.value,
      fields: fields,
      isSearchText: true,
    })
  }, [fields, isFuzzy, onChange]);

  return (
    <Input value={value?.keyword} onChange={handleChange}  {...other} />
  )
})