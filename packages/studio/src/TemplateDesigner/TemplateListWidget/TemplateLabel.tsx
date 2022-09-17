import React, { useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import TemplateActions from "./TemplateActions"

const TemplateLabel = (
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
        <TemplateActions
          pageId={page.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {p(page.title)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditPageDialog page={page} categories={categories} isModalVisible={modalOpen} onClose={handleClose} />
      </div>
    </TreeNodeLabel>
  )
}

export default TemplateLabel