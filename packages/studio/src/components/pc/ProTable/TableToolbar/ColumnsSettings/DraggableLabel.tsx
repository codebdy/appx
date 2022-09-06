import React, { CSSProperties, useCallback, useState } from "react"
import { HolderOutlined } from "@ant-design/icons"
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const DraggableLabel = React.forwardRef((
  props: {
    name: string,
    title: string,
    float?: boolean,
    style?: CSSProperties,
    fixed?: boolean,
    checked?: boolean,
    onChange?: (name: string, checked?: boolean) => void,
  },
  ref: any
) => {
  const { name, title, float, style, fixed, checked, onChange, ...other } = props;
  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleChange = useCallback((event: CheckboxChangeEvent) => {
    onChange && onChange(name, event.target.checked)
  }, [name, onChange])

  return (
    <div ref={ref} className="draggable-label" {...other}
      style={{
        ...style,
        boxShadow: float || (hover && !fixed) ? "2px 2px 10px 1px rgb(25 42 70 / 11%)" : undefined,
        pointerEvents: float ? "none" : undefined,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="draggable-icon">
        <HolderOutlined />
      </div>
      <Checkbox checked={checked} onChange={handleChange}>
        {title}
      </Checkbox>
    </div>
  )
})

export default DraggableLabel