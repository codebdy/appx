import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import { IListNode } from "./recoil/IListNode"
import EditCategoryDialog from "./EditCategoryDialog"
import CreatePageModal from "./CreatePageModal"

const CategoryLabel = (
  props: {
    category: IListNode
  }
) => {
  const { category } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageModalOpen, setPageModalOpen] = useState(false);

  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [])

  const handleEdit = useCallback(() => {
    setModalOpen(true);
  }, [])

  const handleAddPage = useCallback(() => {
    setPageModalOpen(true);
  }, [])

  const handleClosePageModal = useCallback(() => {
    setPageModalOpen(false);
  }, []);


  return (
    <TreeNodeLabel
      fixedAction={visible}
      action={
        <CategoryActions
          uuid={category.uuid}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
          onAddPage={handleAddPage}
        />
      }
    >
      {category.title}
      <EditCategoryDialog
        category={category}
        isModalVisible={modalOpen}
        onClose={handleCloseModal}
      />
      <CreatePageModal
        category={category}
        isModalVisible={pageModalOpen}
        onClose={handleClosePageModal}
      />
    </TreeNodeLabel>
  )
}

export default CategoryLabel