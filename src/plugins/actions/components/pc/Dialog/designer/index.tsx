import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { DialogContentDesigner } from './DialogContentDesigner'
import { DialogFooterDesigner } from './DialogFooterDesigner'
import { DialogTitleDesigner } from './DialogTitleDesigner'
import { IconView, useParseLangMessage, useFindNode } from '@rxdrag/plugin-sdk'
import { IDialogProps } from '../view'
import { IDialogTitleProps } from '../view/DialogTitle'
import { IDialogContentProps } from '../view/DialogContent'
import { IDialogFooterProps } from '../view/DialogFooter'

const DialogDesigner: DnFC<IDialogProps> & {
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

export default DialogDesigner;
