import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import CategoryActions from "./CategoryActions"
import EditCategoryDialog from "./EditCategoryDialog"
import CreatePageModal from "./CreatePageModal"
import { IPageCategory } from "packages/studio/src/model"

const CategoryLabel = (
  props: {
    category: IPageCategory
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
      <div
        onClick={e => e.stopPropagation()}
      >
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
      </div>
    </TreeNodeLabel>
  )
}

export default CategoryLabel