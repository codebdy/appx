import React, { Children, CSSProperties, useCallback, useMemo, useState } from 'react'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  TreeNodeWidget,
  useNodeIdProps,
  DroppableWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { createFieldSchema } from "../../common/Field";
import { DropdownMenuSchema } from './schema'
import { DropdownMenuLocales } from './locales'
import { Button, Dropdown, Menu, MenuItemProps } from 'antd'
import { CloseOutlined, DownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { IDropdownMenuProps } from '../DropdownMenu'
import { MenuItemDesigner } from './MenuItemDesigner'
import { DropdownMenuItemSchema } from './MenuItemDesigner/schema'
import { DropdownMenuItemLocales } from './MenuItemDesigner/locales'

export const DropdownMenuDesigner: DnFC<IDropdownMenuProps & { style?: CSSProperties }> & {
  Item?: React.FC<MenuItemProps>
} = observer((props) => {
  const { style, children, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const node = useTreeNode()

  const handleToggleVisiable = useCallback(() => {
    setVisiable(visible => !visible);
  }, [])


  return (
    <>
      {visible &&
        <div className='menu-designer'>
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
          <Button
            type="primary"
            danger
            shape="circle"
            size='small'
            style={{ position: "absolute", top: -8, right: -8, width: 16, minWidth: 16, height: 16 }}
            icon={
              <CloseOutlined style={{ fontSize: 12 }} />
            }
            onClick={handleToggleVisiable}
          >
          </Button>
        </div>
      }
      <Button
        onClick={e => e.preventDefault()} style={{ ...(!visible ? style : {}), position: "relative" }}
        {...(!visible ? other : {})}
      >
        Hover me
        <DownOutlined />
        {
          !visible &&
          <Button
            type="primary"
            danger
            shape="circle"
            size='small'
            style={{ position: "absolute", top: -8, right: -8, width: 16, minWidth: 16, height: 16 }}
            icon={
              <EllipsisOutlined style={{ fontSize: 12 }} />
            }
            onClick={handleToggleVisiable}
          >
          </Button>
        }

      </Button>
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
      propsSchema: createFieldSchema(DropdownMenuItemSchema),
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
      },
    },
  ],
})
