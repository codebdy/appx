import React, { useCallback, useState } from "react"
import TreeNodeLabel from "../../../common/TreeNodeLabel";
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";
import { IPageFrame } from "../../../model";
import { EditPageFrameDialog } from "./EditPageFrameDialog";
import PageFrameActions from "./PageFrameActions"

const PageFrameLabel = (
  props: {
    pageFrame: IPageFrame
  }
) => {
  const { pageFrame } = props;
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const p = useParseLangMessage();
  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setModalOpen(true)
  }, [])

  const handleClose  = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <TreeNodeLabel fixedAction={visible}
      action={
        <PageFrameActions
          pageFrameId={pageFrame.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {p(pageFrame.title)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditPageFrameDialog template={pageFrame} isModalVisible={modalOpen} onClose={handleClose} />
      </div>
    </TreeNodeLabel>
  )
}

export default PageFrameLabel