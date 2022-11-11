import { DroppableWidget, useTree, useTreeNode } from "@designable/react"
import { observer } from "@formily/react"
import React, { useCallback, useEffect } from "react"
import clx from "classnames"
import { IPopupPanelProps, PopupPanel } from "../../view/PopupPanel"
import { useDropdownDesignerParams } from "../context"
import { PopupButton } from "~/plugin-sdk"
import { CloseOutlined } from "@ant-design/icons"

export const PopupPanelDesigner = observer((props: IPopupPanelProps) => {
  const { className, children, ...other } = props
  const { visible, setVisible } = useDropdownDesignerParams()
  const tree = useTree();
  const node = useTreeNode();

  const handleClose = useCallback(() => {
    tree.operation.selection.clear()
    setVisible(false);
  }, [setVisible, tree])

  useEffect(() => {
    if (visible) {
      tree.operation.selection.select(node.id)
    }
  }, [visible, node])

  return (
    <PopupPanel {...other} className={clx(className)}>
      <DroppableWidget>
        {children}
      </DroppableWidget>
      <PopupButton
        icon={<CloseOutlined style={{ fontSize: 12 }} />}
        onToggleVisiable={handleClose}
      />
    </PopupPanel>
  )
})
