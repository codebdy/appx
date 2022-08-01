import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import { IListNode } from "./recoil/IListNode"

const CategoryLabel = (
  props: {
    category: IListNode
  }
) => {
  const { category } = props;
  const [visible, setVisible] = useState(false);

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);


  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        <CategoryActions
          uuid={category.uuid}
          onVisibleChange={handleVisableChange}
        />
      }
    >
      {category.title}
    </TreeNodeLabel>
  )
}

export default CategoryLabel