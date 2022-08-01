import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useEffect, useState } from "react"
import CategoryActions from "./CategoryActions"
import { IListNode } from "./recoil/IListNode"
import { Input } from "antd"

const CategoryLabel = (
  props: {
    category: IListNode
  }
) => {
  const { category } = props;
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(category.title);
  useEffect(() => {
    setTitle(category.title)
  }, [category.title])

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, [])

  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setTitle(e.target.value);
  }, [])

  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        !editing && <CategoryActions
          uuid={category.uuid}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }
    >
      {
        editing ?
          <Input
            size="small"
            value={title}
            onChange={handleChange}
          />
          :
          title
      }
    </TreeNodeLabel>
  )
}

export default CategoryLabel