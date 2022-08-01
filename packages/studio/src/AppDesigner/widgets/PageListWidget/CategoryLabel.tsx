import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import { IListNode } from "./recoil/IListNode"
import EditCategoryDialog from "./EditCategoryDialog"

const CategoryLabel = (
  props: {
    category: IListNode
  }
) => {
  const { category } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [])

  const handleEdit = useCallback(() => {
    setModalOpen(true);
  }, [])


  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        <CategoryActions
          uuid={category.uuid}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }
    >
      {category.title} 
      <EditCategoryDialog
        category={category}
        isModalVisible={modalOpen}
        onClose={handleCloseModal}
      />
    </TreeNodeLabel>
  )
}

export default CategoryLabel