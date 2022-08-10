import React, { CSSProperties, useCallback, useState } from "react"
import { HolderOutlined } from "@ant-design/icons"
import { ID } from "../../../shared";

const DraggableLabel = React.forwardRef((
  props: {
    title: string,
    dragId: ID,
    float?: boolean,
    style?: CSSProperties,
    fixed?: boolean,
  },
  ref: any
) => {
  const { title, dragId, float, style, fixed, ...other } = props;
  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <div ref={ref} className="draggable-label" {...other}
      style={{
        ...style,
        boxShadow: float || (hover && !fixed) ? "2px 2px 10px 1px rgb(25 42 70 / 11%)" : undefined,
        pointerEvents: float ? "none" : undefined,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseOut={handleMouseLeave}
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