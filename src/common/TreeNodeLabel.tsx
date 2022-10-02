import React, { useCallback, useState } from "react"
import { memo } from "react"

const TreeNodeLabel = memo((
  props: {
    action?: React.ReactNode,
    children?: React.ReactNode,
    fixedAction?: boolean,
    onClick?: (event: React.MouseEvent<any>) => void,
  }
) => {
  const { action, children, fixedAction, onClick } = props;
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
      onClick={onClick}
    >
      {children}
      {
        (hover || fixedAction) &&
        <div className="node-actions">
          {action}
        </div>
      }
    </div>
  )
})

export default TreeNodeLabel