import React, { useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import { ITemplate } from "../../model";
import { EditTemplateDialog } from "./EditTemplateDialog";
import TemplateActions from "./TemplateActions"

const TemplateLabel = (
  props: {
    template: ITemplate
  }
) => {
  const { template } = props;
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
        <TemplateActions
          templateId={template.id}
          onVisibleChange={handleVisableChange}
          onEdit={handleEdit}
        />
      }>
      {p(template.title)}
      <div
        onClick={e => e.stopPropagation()}
      >
        <EditTemplateDialog template={template} isModalVisible={modalOpen} onClose={handleClose} />
      </div>
    </TreeNodeLabel>
  )
}

export default TemplateLabel