import React, { useCallback, useMemo, useState } from 'react'
import { FormGrid as FormilyGird } from '@formily/antd'
import { TreeNode, createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  useNodeIdProps,
  DroppableWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate'
import { createFieldSchema } from "../../common/Field";
import { DropdownMenuSchema } from './schema'
import { DropdownMenuLocales } from './locales'
import { Button, Dropdown, Menu } from 'antd'
import { CloseOutlined, DownOutlined, EllipsisOutlined, EyeInvisibleOutlined, EyeOutlined, SmileOutlined } from '@ant-design/icons'
import { IDropdownMenu } from '../DropdownMenu'


export const DropdownMenuDesigner: DnFC<IDropdownMenu> = observer((props) => {
  const { style, ...other } = props;
  const [visible, setVisiable] = useState(false);
  const node = useTreeNode()

  const handleToggleVisiable = useCallback(() => {
    setVisiable(visible => !visible);
  }, [])

  const menu = useMemo(() => (
    <Menu style={{ position: "relative" }}>
      <div {...(!visible ? props : {})}>哈哈</div>
      <div>
        <Menu.Item>菜单项一</Menu.Item>
      </div>
      <Menu.Item>菜单项二</Menu.Item>
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addItem'),
            icon: 'AddOperation',
            onClick: () => {
              const column = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'DropdownMenu.Item',
                },
              })
              node.append(column)
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
    </Menu>
  ), [handleToggleVisiable, props, visible]);


  return (
    <>
      <Dropdown overlay={menu} visible={visible}>
        <Button onClick={e => e.preventDefault()} style={{ ...(!visible ? style : {}), position: "relative" }} {...(!visible ? other : {})}>
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
      </Dropdown>
    </>
  )
})

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
