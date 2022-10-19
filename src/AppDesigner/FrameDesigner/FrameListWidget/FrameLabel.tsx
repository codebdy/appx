import React, { useCallback, useState } from "react"
import TreeNodeLabel from "../../../common/TreeNodeLabel";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { IPageFrame } from "~/model";
import { EditFrameDialog } from "./EditFrameDialog";
import FrameActions from "./FrameActions"

const FrameLabel = (
  props: {
    frame: IPageFrame
  }
) => {
  const { frame } = props;
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
        <FrameActions
          frameId={frame.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {p(frame.title)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditFrameDialog frame={frame} isModalVisible={modalOpen} onClose={handleClose} />
      </div>
    </TreeNodeLabel>
  )
}

export default FrameLabel