import { observer } from "@formily/reactive-react"
import { Input, message } from "antd"
import React, { useCallback, useMemo } from "react"
import { useFieldSchema } from "@formily/react"
import { IFieldSource } from "../../../datasource/model/IFieldSource"
import { isArr } from "@formily/shared"
import { IAppxAction, useDoActions } from "../../../shared/action"

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
  onEnter?: IAppxAction[],
}

export const SearchInput = observer((props: ISearchInput) => {
  const { isFuzzy, value, onChange, onEnter, ...other } = props;
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

  const handleKeyEnter = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter") {
      return;
    }
    if (!onEnter) {
      return;
    }
    doActions(onEnter)
      .then(() => {
      })
      .catch((error) => {
        message.error(error?.message);
        console.error(error);
      })
      ;
  }, [doActions, onEnter])
  return (
    <Input value={value?.keyword} onChange={handleChange} onKeyUp={handleKeyEnter}  {...other} />
  )
})