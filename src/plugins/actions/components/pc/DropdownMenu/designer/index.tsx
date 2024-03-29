import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TreeNode } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useSelected,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { Button } from 'antd'
import { CloseOutlined, DownOutlined } from '@ant-design/icons'
import { MenuItemDesigner } from './MenuItemDesigner'
import { IDropdownMenuItemProps, IDropdownMenuProps } from '../view'
import { PopupButton, IconView, useParseLangMessage } from '@rxdrag/plugin-sdk'


const ComponentDesigner: DnFC<IDropdownMenuProps> &
{
  Item?: React.FC<IDropdownMenuItemProps>
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
          className='menu-designer'
          style={{
            ...getPlacementStyle()
          }}>
          {children}
          <LoadTemplate
            actions={[
              {
                title: node.getMessage('addItem'),
                icon: 'AddOperation',
                onClick: () => {
                  const item = new TreeNode({
                    componentName: 'Field',
                    props: {
                      type: 'void',
                      'x-component': 'DropdownMenu.Item',
                      'x-component-props': {
                        title: 'Menu Item'
                      }
                    },
                  })
                  node.append(item)
                },
              },
            ]}
          />
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

ComponentDesigner.Item = MenuItemDesigner;

export default ComponentDesigner;