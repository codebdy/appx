import React, { CSSProperties } from "react"
import { HolderOutlined } from "@ant-design/icons"
import { ID } from "../../../shared";

const DraggableLabel = React.forwardRef((
  props: {
    title: string,
    dragId: ID,
    float?: boolean,
    style?: CSSProperties,
  },
  ref: any
) => {
  const { title, dragId, float, style, ...other } = props;

  return (
    <div ref={ref} className="draggable-label" {...other}
      style={{
        ...style,
        boxShadow: float ? "2px 2px 10px 1px rgb(25 42 70 / 11%)" : undefined,
      }}
    >
      <div className="draggable-icon">
        <HolderOutlined />
      </div>
      {
        title
      }
    </div>
  )
})

export default DraggableLabel