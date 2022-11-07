import React, {
  useState,
  useRef,
  useEffect,
} from 'react'
import { Button, Modal as AntdModal, ModalProps } from 'antd'

import {
  DnFC,
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
import { useFindNode, useParseLangMessage } from '~/plugin-sdk'
import { IDialogTitleProps } from '../view/DialogTitle'
import { IDialogContentProps } from '../view/DialogContent'
import { IDialogFooterProps } from '../view/DialogFooter'
import { DialogTitleDesigner } from './DialogTitleDesigner'
import { DialogContentDesigner } from './DialogContentDesigner'
import { DialogFooterDesigner } from './DialogFooterDesigner'
import { IDialogProps } from '../view'

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
  const tree = useTree()
  const designer = useDesigner()
  const selected = useSelected();
  const node = useTreeNode()
  const nodeIdProps = useNodeIdProps()
  const dialogContainer = useRef<HTMLElement>()
  const [visible, setVisible] = useState(false)
  const antModelRef = useRef<HTMLElement>()
  const p = useParseLangMessage();
  const dialogTitle = useFindNode('Title');
  const content = useFindNode("Content");
  const footer = useFindNode("Footer");

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

  return (
    <>
      <Button
        {...(!visible && nodeIdProps)}
        {...other}
        onClick={() => {
          if (canShow.current <= 1) {
            canShow.current++
            return
          }
          setVisible(true)
        }}>
        {
          p(title)
        }
      </Button>
      {
        visible &&
        <AntdModal
          {...dialogProps}
          open={visible}
          title={dialogTitle && <TreeNodeWidget node={dialogTitle} />}
          width = {width}
          centered
          destroyOnClose = {destroyOnClose}
          focusTriggerAfterClose = {focusTriggerAfterClose}
          keyboard = {keyboard}
          mask
          closable={true}
          data-dialog-id={nodeIdProps[designer.props.nodeIdAttrName]}
          getContainer={() => dialogContainer.current}
          maskClosable={false}
          transitionName={''}
          {...other}
          footer={hasFooter && footer && <TreeNodeWidget node={footer} />}
          onCancel={() => {
            setVisible(false)
          }}>
          {
            content && <TreeNodeWidget node={content} />
          }
        </AntdModal>
      }

    </>
  )
})


DialogDesigner.Title = DialogTitleDesigner;
DialogDesigner.Content = DialogContentDesigner;
DialogDesigner.Footer = DialogFooterDesigner;
