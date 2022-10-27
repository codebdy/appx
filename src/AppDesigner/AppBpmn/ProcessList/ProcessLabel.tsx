import TreeNodeLabel from "~/common/TreeNodeLabel"
import React, { useCallback, useState } from "react"
import { IPage, IPageCategory } from "~/model"
import ProcessActions from "./ProcessActions"
import EditProccessDialog from "./EditProcessDialog"
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage"

const ProcessLabel = (
  props: {
    page: IPage,
    categories: IPageCategory[]
  }
) => {
  const { page, categories } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const p = useParseLangMessage();
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
        <ProcessActions
          pageId={page.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {p(page.title)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditProccessDialog page={page} categories={categories} isModalVisible={modalOpen} onClose={handleClose} />
      </div>
    </TreeNodeLabel>
  )
}

export default ProcessLabel