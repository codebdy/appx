import React, { memo } from "react"

export const ItemIcon = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  return (
    <div className="item-icon">
      {
        props.children
      }
    </div>
  )
})

export default ItemIcon