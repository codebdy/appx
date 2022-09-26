import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createBehavior, createResource } from '@designable/core'
import {
  DnFC,
  TreeNodeWidget,
  useSelected,
  useTreeNode,
  useTree,
  useNodeIdProps,
  useDesigner
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { createFieldSchema } from "../../common/Field";
import { DialogSchema } from './schema'
import { DialogLocales } from './locales'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { IconView } from '../../../plugin-sdk/icon/IconView'
import { useParseLangMessage } from '../../../hooks/useParseLangMessage'
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
    changeRemind,
    style,
    ...other
  } = props;
  const [visible, setVisiable] = useState(false);
  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null);
  // const tree = useTree()
  const designer = useDesigner()
  // const nodeIdProps = useNodeIdProps()
  const p = useParseLangMessage();
  const dialogTitle = useFindNode('Title');
  const content = useFindNode("Content");
  const footer = useFindNode("Footer");
  const node = useTreeNode();
  const viewPort = document.querySelector(".dn-viewport");
  const viewRect = viewPort?.getBoundingClientRect();
  const tree = useTree();
  const nodeIdProps = useNodeIdProps()

  useEffect(() => {
    const name = designer.props.nodeIdAttrName
    tree.operation.selection.clear()
    
    if (visible) {
      ref.current?.removeAttribute(name);
      contentRef.current?.setAttribute(name, nodeIdProps[name]);
    } else {
      contentRef.current?.removeAttribute(name);
      //ref.current?.setAttribute(name, nodeIdProps[name]);
    }
    
    setTimeout(() => {
      tree.operation.selection.clear()
      //tree.operation.selection.select(nodeIdProps[name])
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

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

  return (
    <>
      {visible &&
        <>
          <div className='rx-dialog-mask'
            style={{
              left: viewRect?.left,
              top: viewRect?.top,
              height: viewRect?.height,
              width: viewRect.width,
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
              ref={contentRef}
              {... (visible && nodeIdProps)}
            >
              <div style={{
                flex: 1,
                height: 0,
                overflow: "auto",
              }}>
                {
                  closable &&
                  <div className='dialog-close'>
                    <Button type='text' onClick={handleClose}>
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
            </div>
          </div>
        </>
      }
      <Button
        icon={icon && <IconView icon={icon} />}
        style={{ ...(!visible ? style : {}) }}
        {...other}
        {...(!visible && nodeIdProps)}
        ref={ref}
        onClick={handleShow}
      >
        {
          p(title)
        }
      </Button>
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
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  "title": "$inline:{\"zh-CN\":\"取消\"}",
                  "type": "default"
                },
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  "title": "$inline:{\"zh-CN\":\"确定\"}",
                  "type": "primary"
                },
              },
            },
          ],
        },
      ],
    },
  ],
})
