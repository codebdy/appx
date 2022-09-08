import React, { useCallback, useRef, useState } from 'react'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { createFieldSchema } from "../../common/Field";
import { DropdownMenuSchema } from './schema'
import { DropdownMenuLocales } from './locales'
import { Button } from 'antd'
import { CloseOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { IDropdownMenuProps } from '../DropdownMenu'
import { MenuItemDesigner } from './MenuItemDesigner'
import { DropdownMenuItemSchema } from './MenuItemDesigner/schema'
import { DropdownMenuItemLocales } from './MenuItemDesigner/locales'
import { Events } from '../../../shared/action'
import { IconView } from '../../../shared/icon/IconView'
import { useParseLangMessage } from '../../../hooks/useParseLangMessage'
import { IDropdownMenuItemProps } from '../DropdownMenu/MenuItem'
import { PopupButton } from '../../common/PopupButton'

export const DropdownMenuDesigner: DnFC<IDropdownMenuProps> &
{
  Item?: React.FC<IDropdownMenuItemProps>
} = observer((props) => {
  const { title, icon, showDropdownIcon, placement, children, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const node = useTreeNode()
  const p = useParseLangMessage();

  const handleToggleVisiable = useCallback(() => {
    setVisiable(visible => !visible);
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
            onToggleVisiable={handleToggleVisiable}
          />
        </div>
      }
      <div style={{ position: "relative" }}>
        {
          showDropdownIcon
            ?
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              ref={ref}
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
            >
              {
                p(title)
              }
            </Button>
        }
        {
          !visible &&
          <PopupButton
            icon={<EllipsisOutlined style={{ fontSize: 12 }} />}
            style={{
              top: 8,
            }}
            onToggleVisiable={handleToggleVisiable}
          />
        }
      </div>
    </>
  )
})

DropdownMenuDesigner.Item = MenuItemDesigner;

DropdownMenuDesigner.Behavior = createBehavior(
  {
    name: 'DropdownMenu',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DropdownMenu',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(DropdownMenuSchema),
    },
    designerLocales: DropdownMenuLocales,
  },
  {
    name: 'DropdownMenu.Item',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'DropdownMenu.Item',
    designerProps: {
      droppable: false,
      propsSchema: createFieldSchema(DropdownMenuItemSchema, { actions: [Events.onClick], noDisplayTab: true }),
    },
    designerLocales: DropdownMenuItemLocales,
  },
)

DropdownMenuDesigner.Resource = createResource({
  icon: 'SelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'DropdownMenu',
        'x-component-props': {
          type: "primary",
          title: "Dropdown",
          showDropdownIcon: true,
          placement: "bottomLeft",
          trigger: ['click']
        },
      },
    },
  ],
})
