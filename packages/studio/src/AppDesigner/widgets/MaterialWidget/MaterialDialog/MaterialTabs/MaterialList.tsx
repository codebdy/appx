import { IMaterialCollapseItem } from "../../../../../plugin-sdk/model"
import React from "react"
import { memo } from "react"

export const MaterialList = memo((
  props: {
    item: IMaterialCollapseItem
  }
) => {
  const { item } = props;

  return (
    <div className="materila-list">
      list
    </div>
  )
})