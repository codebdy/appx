import TreeNodeLabel from "../../../common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import { IPage } from "../../../model"
import PageActions from "./PageActions"
import EditPageDialog from "./EditPageDialog"

const PageLabel = (
  props: {
    page: IPage
  }
) => {
  const { page } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setModalOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <TreeNodeLabel fixedAction={visible}
      action={
        <PageActions
          pageId={page.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {page.title}
      <EditPageDialog page={page} isModalVisible={modalOpen} onClose={handleClose} />
    </TreeNodeLabel>
  )
}

export default PageLabel