import React from "react"
import { HolderOutlined } from "@ant-design/icons"
import { ID } from "../../../shared";

const DraggableLabel = React.forwardRef((
  props: {
    title: string,
    dragId: ID,
  },
  ref: any
) => {
  const { title, dragId, ...other } = props;

  return (
    <div ref={ref} className="page-label" {...other}>
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