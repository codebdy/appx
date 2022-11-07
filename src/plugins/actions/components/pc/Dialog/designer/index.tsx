import React, {
  useState,
  useRef,
  useEffect,
} from 'react'
import { Button, Modal as AntdModal, ModalProps } from 'antd'

import { TreeNode } from '@designable/core'
import {
  DnFC,
  DroppableWidget,
  TreeNodeWidget,
  useDesigner,
  useNodeIdProps,
  useTree,
  useTreeNode,
  useSelected
} from '@designable/react'
import { observer, Schema } from '@formily/react'
import { Field, GeneralField } from '@formily/core'
import './styles.less'
import { findNodeByComponentPath } from '~/plugin-sdk'
import Dialog from '../view'
import { IDialogTitleProps } from '../view/DialogTitle'
import { IDialogContentProps } from '../view/DialogContent'
import { IDialogFooterProps } from '../view/DialogFooter'
import { DialogTitleDesigner } from './DialogTitleDesigner'
import { DialogContentDesigner } from './DialogContentDesigner'
import { DialogFooterDesigner } from './DialogFooterDesigner'


export interface IDialogProps extends ModalProps, IDialogRef {
  children?: React.ReactNode
  target?: React.ReactNode
  ref?: React.MutableRefObject<IDialogRef>
  onCancel?: (event: React.MouseEvent<HTMLElement>) => boolean | undefined | void
}


export interface IDialogContext {
  field: Field | GeneralField
  schema: Schema
  id: string
  visible: boolean
  // open: () => void
  // close: () => void
}

export interface IDialogRef {
  // open: () => void
  // close: () => void
  context: IDialogContext
}


export const DialogDesigner: DnFC<IDialogProps> & {
  Title?: React.FC<IDialogTitleProps>,
  Content?: React.FC<IDialogContentProps>,
  Footer?: React.FC<IDialogFooterProps>,
} = observer((props) => {
  const dialog = useRef<IDialogRef>()
  const tree = useTree()
  const designer = useDesigner()
  const selected = useSelected();
  const node = useTreeNode()
  const nodeIdProps = useNodeIdProps()
  const dialogContainer = useRef<HTMLElement>()
  const [visible, setVisible] = useState(false)
  const antModelRef = useRef<HTMLElement>()

  const canShow = useRef(selected?.[0] === node.id ? 1 : 0)

  dialogContainer.current = document.querySelector('.dn-designable-form')

  useEffect(() => {
    if (!dialogContainer.current) {
      return
    }

    const name = designer.props.nodeIdAttrName
    if (!antModelRef.current) {
      antModelRef.current = dialogContainer.current.querySelector(`div[data-dialog-id='${nodeIdProps[name]}'] .ant-modal`)
    }
    tree.operation.selection.clear()

    if (visible) {
      antModelRef.current?.setAttribute(name, nodeIdProps[name])
    } else {
      antModelRef.current?.removeAttribute(name)
    }

    setTimeout(() => {
      canShow.current = 2
      tree.operation.selection.select(nodeIdProps[name])
    }, 100)

  }, [dialogContainer, visible])

  useEffect(() => {
    if (!selected?.[0]) {
      canShow.current--
      return
    }

    if (selected?.[0] === node.id) {
      canShow.current = Math.max(canShow.current, 0) + 1
    } else {
      canShow.current = 0
    }
    console.log(canShow.current)
  }, [selected?.[0]])


  const dialogProps = {
    ...props,
    [designer.props.nodeIdAttrName]: null
  }

  const body = findNodeByComponentPath(node, ['Dialog', 'Dialog.Body'])
  const footer = findNodeByComponentPath(node, ['Dialog', 'Dialog.Footer'])

  useEffect(() => {

    const defaultBodyNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Dialog.Body'
      },
      children: []
    })

    if (!body) {
      node.append(defaultBodyNode)
    }

    const defaultFooterNodes = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Dialog.Footer',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Button',
            'x-component-props': {
              title: 'Cancel'
            }
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Button',
            'x-component-props': {
              type: 'primary',
              title: 'Ok'
            }
          },
        },
      ]
    })

    if (!footer) {
      node.append(defaultFooterNodes)
    }

  }, [])

  return (
    <>
      <Button
        {...(!visible && nodeIdProps)}
        onClick={() => {
          if (canShow.current <= 1) {
            canShow.current++
            return
          }
          setVisible(true)
          dialog.current!.context!.visible = true
        }}>编辑弹窗内容</Button>
      {
        visible &&
        <AntdModal
          {...dialogProps}
          open={visible}
          title={
            <span data-content-editable="x-component-props.title">
              {props.title}
            </span>
          }
          closable={true}
          data-dialog-id={nodeIdProps[designer.props.nodeIdAttrName]}
          getContainer={() => dialogContainer.current}
          maskClosable={false}
          transitionName={''}
          // footer={
          //   footer?.children.length > 0 ? <TreeNodeWidget node={footer} key={footer?.id} /> :
          //     <DroppableWidget node={footer} />
          // }
          onCancel={() => {
            setVisible(false)
            dialog.current!.context!.visible = false
          }}>
          {
            visible && <>
              {
                body?.children.length > 0 ? <TreeNodeWidget node={body} key={body?.id} /> : <DroppableWidget node={body} />
              }

            </>
          }
        </AntdModal>
      }

    </>
  )
})


DialogDesigner.Title = DialogTitleDesigner;
DialogDesigner.Content = DialogContentDesigner;
DialogDesigner.Footer = DialogFooterDesigner;
