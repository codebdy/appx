import { observer } from "@formily/reactive-react"
import { Input } from "antd"
import React from "react"

export interface ISearchInput {
  isFuzzy?: boolean,
}

export const SearchInput = observer((props: ISearchInput) => {
  const { isFuzzy, ...other } = props;
  return (
    <Input {...other} />
  )
})