import React, { useCallback, useState } from "react"
import TreeNodeLabel from "../../common/TreeNodeLabel";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import { ITemplate } from "../../model";
import TemplateActions from "./TemplateActions"

const TemplateLabel = (
  props: {
    template: ITemplate
  }
) => {
  const { template } = props;
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const p = useParseLangMessage();
  const handleVisableChange = useCallback((visible) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true)
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
    </TreeNodeLabel>
  )
}

export default TemplateLabel