import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DnFC,
  useTreeNode,
  useSelected,
  TreeNodeWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import { IDropdownProps } from '../view'
import { PopupButton, IconView, useParseLangMessage, useFindNode } from '@rxdrag/plugin-sdk'
import { IPopupPanelProps } from '../view/PopupPanel'
import { PopupPanelDesigner } from './PopupPanelDesigner'
import { DropdownDesignerContext } from './context'
import { ButtonProps } from '../view/Button'
import ButtonDesigner from './ButtonDesigner'

const ComponentDesigner: DnFC<IDropdownProps> & {
  PopupPanel?: React.FC<IPopupPanelProps>,
  Button?: React.FC<ButtonProps>
} = observer((props) => {
  const { placement, children, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const node = useTreeNode()
  const selected = useSelected();


  const pannel = useFindNode("PopupPanel");
  const button = useFindNode("Button");

  const [canShow, setCanShow] = useState(false);
  useEffect(() => {
    setCanShow(selected?.[0] === node.id)
  }, [node.id, selected])

  const handleShow = useCallback(() => {
    if (canShow) {
      setVisiable(true);
    }
  }, [canShow])

  const handleClose = useCallback(() => {
    setVisiable(false);
  }, [])

  const getPlacementStyle = () => {
    const rect = ref?.current?.getBoundingClientRect();
    switch (placement) {
      case "bottom":
        return {
          top: rect?.bottom,
          left: "auto",
          bottom: "auto",
          right: "auto",
        }
      case "bottomLeft":
        return {
          top: rect?.bottom,
          left: rect?.left,
          bottom: "auto",
          right: "auto",
        }
      case "bottomRight":
        return {
          top: rect?.bottom,
          right: document.documentElement.clientWidth - rect?.right,
          left: "auto",
          bottom: "auto",
        }
      case "top":
        return {
          bottom: document.documentElement.clientHeight - rect?.top,
          left: "auto",
          right: "auto",
          top: "auto",
        }
      case "topLeft":
        return {
          bottom: document.documentElement.clientHeight - rect?.top,
          left: rect?.left,
          top: "auto",
          right: "auto",
        }
      case "topRight":
        return {
          bottom: document.documentElement.clientHeight - rect?.top,
          right: document.documentElement.clientWidth - rect?.right,
          left: "auto",
          top: "auto",
        }
    }
  }

  const config = useMemo(() => {
    return {
      visible,
      setVisiable
    }
  }, [visible])

  return (
    <DropdownDesignerContext.Provider value={config} >
      {visible &&
        <div
          className='dropdown-designer'
          style={{
            ...getPlacementStyle()
          }}>
          <TreeNodeWidget node={pannel} />
          <PopupButton
            icon={<CloseOutlined style={{ fontSize: 12 }} />}
            onToggleVisiable={handleClose}
          />
        </div>
      }
      <div style={{ position: "relative", display: "inline" }} {...other}>
        <TreeNodeWidget node={button} />
      </div>
    </DropdownDesignerContext.Provider>
  )
})

ComponentDesigner.Button = ButtonDesigner
ComponentDesigner.PopupPanel = PopupPanelDesigner

export default ComponentDesigner;