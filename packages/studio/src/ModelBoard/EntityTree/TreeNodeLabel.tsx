import React, { useCallback, useState } from "react"
import { memo } from "react"

const TreeNodeLabel = memo((
  props: {
    action?: React.ReactNode,
    children?: React.ReactNode,
    fixedAction?:boolean,
  }
) => {
  const { action, children, fixedAction } = props;
  const [hover, setHover] = useState(false);
  const handleMouseOver = useCallback(() => {
    setHover(true)
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false)
  }, []);

  return (
    <div className='tree-node-label'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {(hover || fixedAction) && action}
    </div>
  )
})

export default TreeNodeLabel