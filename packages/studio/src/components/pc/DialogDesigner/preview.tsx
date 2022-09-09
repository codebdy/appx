import React, { useCallback, useRef, useState } from 'react'
import { createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  useTreeNode,
  DroppableWidget,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { createFieldSchema } from "../../common/Field";
import { DialogSchema } from './schema'
import { DialogLocales } from './locales'
import { Button } from 'antd'
import { CloseOutlined, EllipsisOutlined } from '@ant-design/icons'
import { IconView } from '../../../shared/icon/IconView'
import { useParseLangMessage } from '../../../hooks/useParseLangMessage'
import { PopupButton } from '../../common/PopupButton'
import { IDialogProps } from '../Dialog'
import { IDialogContentProps } from '../Dialog/DialogContent'
import { IDialogFooterProps } from '../Dialog/DialogFooter'
import { DialogContentDesigner } from './DialogContentDesigner'
import { DialogFooterDesigner } from './DialogFooterDesigner'

export const DialogDesigner: DnFC<IDialogProps> & {
  Content?: React.FC<IDialogContentProps>,
  Footer?: React.FC<IDialogFooterProps>,
} = observer((props) => {
  const {
    title,
    icon,
    children,
    width = 520,
    centered,
    closable,
    destroyOnClose,
    focusTriggerAfterClose,
    footer,
    keyboard,
    mask,
    maskClosable,
    style,
    ...other
  } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const node = useTreeNode()
  const p = useParseLangMessage();

  const viewTree = document.querySelector(".dn-component-tree");
  const treeRect = viewTree?.getBoundingClientRect();
  const viewPort = document.querySelector(".dn-viewport");
  const viewRect = viewPort?.getBoundingClientRect();

  const handleToggleVisiable = useCallback(() => {
    setVisiable(visible => !visible);
  }, [])

  return (
    <>
      {visible &&
        <>
          <div className='rx-dialog-mask'
            style={{
              left: treeRect?.left,
              top: treeRect?.top,
              height: treeRect?.height,
              width: treeRect.width,
            }}
          >
          </div>
          <div className='rx-dialog-wrap'
            style={{
              left: viewRect?.left,
              top: viewRect?.top,
              height: viewRect?.height,
              width: viewRect.width,
              alignItems: centered ? "center" : "flex-start",
            }}
          >
            <div
              className='rx-dialog-content'
              style={{
                width: width,
                background: "#fff",
                marginTop: centered ? undefined : 100,
                maxHeight: viewRect?.height - 200,
              }}
            >
              <div style={{
                flex: 1,
                height: 0,
                overflow: "auto",
              }}>
                <div className='dialog-close'>
                  <Button type='text'>
                    <CloseOutlined />
                  </Button>
                </div>
                <div className='dialog-header'>
                  <div className='dialog-title'>
                    {title}
                  </div>
                </div>
                {children}
              </div>
              <PopupButton
                icon={<CloseOutlined style={{ fontSize: 12 }} />}
                onToggleVisiable={handleToggleVisiable}
              />
            </div>
          </div>
        </>
      }
      <div style={{ position: "relative", display: "inline" }}>
        <Button
          icon={icon && <IconView icon={icon} />}
          style={{ ...(!visible ? style : {}) }}
          {...(!visible ? other : {})}
          ref={ref}
        >
          {
            p(title)
          }
        </Button>

        {
          !visible &&
          <PopupButton
            icon={<EllipsisOutlined style={{ fontSize: 12 }} />}
            style={{
              top: 0,
            }}
            onToggleVisiable={handleToggleVisiable}
          />
        }
      </div>
    </>
  )
})

DialogDesigner.Content = DialogContentDesigner;
DialogDesigner.Footer = DialogFooterDesigner;

DialogDesigner.Behavior = createBehavior(
  {
    name: 'Dialog',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(DialogSchema),
    },
    designerLocales: DialogLocales,
  },
  {
    name: 'Dialog.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Content',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(DialogSchema.Content),
    },
    designerLocales: DialogLocales.Content,
  },
  {
    name: 'Dialog.Footer',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Footer',
    designerProps: {
      droppable: true,
      propsSchema: createFieldSchema(DialogSchema.Footer),
    },
    designerLocales: DialogLocales.Footer,
  },
)

DialogDesigner.Resource = createResource({
  icon: 'OpenPageButtonSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Dialog',
        'x-component-props': {
          title: "Dialog",
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Dialog.Content',
            'x-component-props': {
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Dialog.Footer',
            'x-component-props': {
            },
          },
        },
      ],
    },
  ],
})
