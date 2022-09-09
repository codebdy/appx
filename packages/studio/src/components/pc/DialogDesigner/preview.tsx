import React, { useCallback, useRef, useState } from 'react'
import { createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  TreeNodeWidget,
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
import { IDialogTitleProps } from '../Dialog/DialogTitle'
import { DialogTitleDesigner } from './DialogTitleDesigner'
import { useFindNode } from '../../common/hooks/useFindNode'

export const DialogDesigner: DnFC<IDialogProps> & {
  Title?: React.FC<IDialogTitleProps>,
  Content?: React.FC<IDialogContentProps>,
  Footer?: React.FC<IDialogFooterProps>,
} = observer((props) => {
  const {
    title,
    icon,
    children,
    width = 520,
    centered,
    closable = true,
    destroyOnClose,
    focusTriggerAfterClose,
    keyboard,
    mask,
    maskClosable,
    footer: hasFooter,
    style,
    ...other
  } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const p = useParseLangMessage();
  const dialogTitle = useFindNode('Title');
  const content = useFindNode("Content");
  const footer = useFindNode("Footer");

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
                {
                  closable &&
                  <div className='dialog-close'>
                    <Button type='text'>
                      <CloseOutlined />
                    </Button>
                  </div>
                }

                <div className='dialog-header'>
                  <div className='dialog-title'>
                    {dialogTitle && <TreeNodeWidget node={dialogTitle} />}
                  </div>
                </div>
                {content && <TreeNodeWidget node={content} />}
                {hasFooter && footer && <TreeNodeWidget node={footer} />}
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
          {...other}
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

DialogDesigner.Title = DialogTitleDesigner;
DialogDesigner.Content = DialogContentDesigner;
DialogDesigner.Footer = DialogFooterDesigner;

DialogDesigner.Behavior = createBehavior(
  {
    name: 'Dialog',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog',
    designerProps: {
      droppable: false,
      propsSchema: createFieldSchema(DialogSchema),
    },
    designerLocales: DialogLocales,
  },
  {
    name: 'Dialog.Title',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Title',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
      propsSchema: createFieldSchema(DialogSchema.Title, { noDisplayTab: true }),
    },
    designerLocales: DialogLocales.Title,
  },
  {
    name: 'Dialog.Content',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Content',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
      propsSchema: createFieldSchema(DialogSchema.Content, { noDisplayTab: true }),
    },
    designerLocales: DialogLocales.Content,
  },
  {
    name: 'Dialog.Footer',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Dialog.Footer',
    designerProps: {
      droppable: true,
      draggable: false,
      deletable: false,
      cloneable: false,
      propsSchema: createFieldSchema(DialogSchema.Footer, { noDisplayTab: true }),
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
          type: "primary",
          footer: true
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Dialog.Title',
            'x-component-props': {
              title: "Title",
            },
          },
        },
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
