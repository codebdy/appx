import { observer } from "@formily/reactive-react"
import { Input, message } from "antd"
import React, { useCallback, useMemo } from "react"
import { useFieldSchema } from "@formily/react"
import { IFieldSource } from "~/datasource/model/IFieldSource"
import { isArr } from "@formily/shared"
import { useDoActions } from "~/shared/action"
import { IAppxAction } from "@rxdrag/plugin-sdk/model/action"

export interface ISearchText {
  isFuzzy?: boolean,
  keyword?: string,
  fields?: string[],
  isSearchText: true,
}

export interface IComponentProps {
  searchStyle?: boolean,
  isFuzzy?: boolean,
  value?: ISearchText,
  onChange?: (value?: ISearchText) => void,
  onSearch?: IAppxAction[],
}

const Component = observer((props: IComponentProps) => {
  const { searchStyle, isFuzzy, value, onChange, onSearch, ...other } = props;
  const doActions = useDoActions();
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

  const handleSearch =  useCallback(() => {
    return doActions(onSearch)
      .then(() => {
      })
      .catch((error) => {
        message.error(error?.message)
        console.error(error)
      })
  }, [doActions, onSearch])

  const handleKeyEnter = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter") {
      return;
    }
    if (!onSearch) {
      return;
    }
    handleSearch();
  }, [handleSearch, onSearch])
  return (
    searchStyle
      ?
      <Input.Search value={value?.keyword} onChange={handleChange} onSearch = {handleSearch}  {...other} />
      :
      <Input value={value?.keyword} onChange={handleChange} onKeyUp={handleKeyEnter} {...other} />
  )
})

export default Component;