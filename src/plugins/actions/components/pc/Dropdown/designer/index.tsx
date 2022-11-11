import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TreeNode } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useSelected,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { Button } from 'antd'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import { IDropdownProps } from '../view'
import { PopupButton, IconView, useParseLangMessage } from '@rxdrag/plugin-sdk'
import { IPopupPanelProps } from '../view/PopupPanel'
import { PopupPanelDesigner } from './PopupPanelDesigner'


const ComponentDesigner: DnFC<IDropdownProps> & {
  PopupPanel?: React.FC<IPopupPanelProps>
} = observer((props) => {
  const { title, icon, showDropdownIcon, placement, children, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const node = useTreeNode()
  const p = useParseLangMessage();
  const selected = useSelected();
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

  return (
    <>
      {visible &&
        <div
          className='dropdown-designer'
          style={{
            ...getPlacementStyle()
          }}>
          <div>
            {children}
          </div>
          <PopupButton
            icon={<CloseOutlined style={{ fontSize: 12 }} />}
            onToggleVisiable={handleClose}
          />
        </div>
      }
      <div style={{ position: "relative", display: "inline" }}>
        {
          showDropdownIcon
            ?
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              ref={ref}
              onClick={handleShow}
            >
              {
                p(title)
              }
              <DownOutlined />
            </Button>
            :
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              ref={ref}
              onClick={handleShow}
            >
              {
                p(title)
              }
            </Button>
        }
      </div>
    </>
  )
})

ComponentDesigner.PopupPanel = PopupPanelDesigner

export default ComponentDesigner;