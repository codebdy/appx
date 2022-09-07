import React, { useCallback, useState } from 'react'
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
import { DownOutlined, EyeOutlined, SmileOutlined } from '@ant-design/icons'
import { IDropdownMenu } from '../DropdownMenu'

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: '4',
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);

export const DropdownMenuDesigner: DnFC<IDropdownMenu> = observer((props) => {
  const [visible, setVisiable] = useState(false);
  const node = useTreeNode()

  const handleToggleVisiable = useCallback(() => {
    setVisiable(visible => !visible);
  }, [])

  return (
    <>
      <Dropdown overlay={menu} visible={visible}>
        <Button onClick={e => e.preventDefault()} style={{ position: "relative" }}>
          Hover me
          <DownOutlined />
          <Button
            type="primary"
            danger
            shape="circle"
            size='small'
            style={{ position: "absolute", top: -4, right: -4, width: 16, minWidth: 16, height: 16 }}
            icon={
              <EyeOutlined style={{ fontSize: 12 }} />
            }
            onClick={handleToggleVisiable}
          >
          </Button>
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
