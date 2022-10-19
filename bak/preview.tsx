import React, {
  createContext,
  useContext,
  useState,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  useEffect, useMemo
} from 'react'
import { Button, Modal as AntdModal, ModalProps, Space } from 'antd'
import { getConfirmLocale } from 'antd/es/modal/locale'
import LocaleReceiver from 'antd/es/locale-provider/LocaleReceiver'

import { createBehavior, createResource, TreeNode } from '@designable/core'
import {
  DnFC,
  DroppableWidget,
  TreeNodeWidget,
  useDesigner,
  useNodeIdProps,
  useTree,
  useTreeNode
} from '@designable/react'
import { createVoidFieldSchema } from '../Field'
import { AllSchemas } from '../../schemas'
import { AllLocales } from '../../locales'
import { observer, RecursionField, Schema, useField, useFieldSchema } from '@formily/react'
import { Field, GeneralField } from '@formily/core'
import './styles.less'
import { define, observable } from '@formily/reactive'
import { Locale } from 'antd/es/locale-provider'
import { findNodeByComponentPath } from '~/shared'


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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const DialogContext = createContext<IDialogContext>()

export const getDialog = (key: string) => {

  if (key && DialogMap.has(key)) {
    return DialogMap.get(key)
  }
  return null
}

export const useDialog = (key?: string) => {

  if (key && DialogMap.has(key)) {
    return DialogMap.get(key)
  }
  return useContext(DialogContext)

}

const DialogMap = new Map<any, IDialogContext>()

const isFooterComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Dialog.Footer') > -1
}
const isBodyComponent = (schema: Schema) => {
  return schema['x-component']?.indexOf('Dialog.Body') > -1
}

const useBody = (schema: Schema) => {
  if (!schema) return null
  return schema.reduceProperties((acc, sc, key) => {
    if (isBodyComponent(sc)) {
      return <RecursionField schema={sc} key={key}/>
    }
    return acc
  }, null)
}

const useFooter = (schema: Schema) => {
  if (!schema) return null
  return schema.reduceProperties((acc, sc, key) => {
    if (isFooterComponent(sc)) {
      return <RecursionField schema={sc} key={key}/>
    }
    return acc
  }, null)
}

type IDialogBody = IDialogProps & { schema: Schema }
type IDialogFooter = IDialogProps & { schema: Schema }

const DialogFooter: React.FC<IDialogFooter> = ({ schema, ...props }) => {

  const footer = (locale: Locale['Modal']) => {

    const f = useFooter(schema)
    const defaultFooter = props.footer ?? (<>
      <Button onClick={props.onCancel} {...props.cancelButtonProps}>{props.cancelText ?? locale.cancelText}</Button>
      <Button type={props.okType as any ?? 'primary'}
              onClick={props.onOk} {...props.okButtonProps}>{props.okText ?? locale.okText}</Button>
    </>)

    return <Space>
      {
        f || defaultFooter
      }
    </Space>
  }

  return (
    <LocaleReceiver defaultLocale={getConfirmLocale()} componentName={'Modal'}>
      {footer}
    </LocaleReceiver>
  )
}

const DialogBody: React.FC<IDialogBody> = ({ schema, ...props }) => {

  const body = useBody(schema) ?? props.children
  return body
}

export const BaseDialog: React.FC<IDialogProps> & {
  Body?: React.FC<any>,
  Footer?: React.FC<any>,
} = observer((
  {
    target,
    ref,
    onCancel,
    ...props
  }) => {

  const field = useField()
  const schema = useFieldSchema()
  const dialog = useDialog()

  const contextValue = useMemo(() => define({
    ...dialog,
    field,
    schema,
    visible: false,
    id: field.address.toString(),
  }, {
    visible: observable.ref
  }), [])

  useEffect(() => {

    if (field) {
      if (!DialogMap.has(field.address.toString())) {
        DialogMap.set(field.address.toString(), contextValue)
      }
    }
    return () => {
      if (field) {
        DialogMap.delete(field.address.toString())
      }
    }
  }, [ field ])

  useImperativeHandle<IDialogProps, IDialogRef>(ref, () => ({
    context: contextValue,
  }), [])

  const handelCancel = (e) => {
    if (onCancel && onCancel(e) === false) {
      return
    }
    contextValue.visible = false
  }

  return (
    <DialogContext.Provider value={contextValue}>
      {target}
      <AntdModal
        {...props}
        visible={contextValue.visible}
        footer={<DialogFooter {...props} schema={schema} onCancel={handelCancel}/>}
        onCancel={handelCancel}
      >
        <DialogBody {...props} schema={schema}/>
      </AntdModal>
    </DialogContext.Provider>
  )
}, { forwardRef: true })

BaseDialog.Footer = () => {
  return <React.Fragment/>
}

BaseDialog.Body = () => {
  return <React.Fragment/>
}

export const Dialog: DnFC<React.ComponentProps<typeof BaseDialog>> = observer((props) => {
  const dialog = useRef<IDialogRef>()
  const tree = useTree()
  const designer = useDesigner()
  const node = useTreeNode()
  const nodeIdProps = useNodeIdProps()
  const dialogContainer = useRef<HTMLElement>()
  const [ visible, setVisible ] = useState(false)

  useLayoutEffect(() => {
    dialogContainer.current = document.querySelector('.dn-designable-form')
  }, [])

  useEffect(() => {

    if (visible && dialogContainer.current) {
      tree.operation.selection.clear()
      const name = designer.props.nodeIdAttrName
      const modal = dialogContainer.current.querySelector(`div[data-dialog-id='${nodeIdProps[name]}'] .ant-modal`)
      modal?.setAttribute(name, nodeIdProps[name])
      setTimeout(() => {
        tree.operation.selection.select(nodeIdProps[name])
      }, 100)
    }

  }, [ dialogContainer, visible ])

  const dialogProps = {
    ...props,
    [designer.props.nodeIdAttrName]: null
  }

  const body = findNodeByComponentPath(node, [ 'Dialog', 'Dialog.Body' ])
  const footer = findNodeByComponentPath(node, [ 'Dialog', 'Dialog.Footer' ])

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
          setVisible(true)
          dialog.current!.context!.visible = true
        }}>编辑弹窗内容</Button>
      <BaseDialog
        {...dialogProps}
        title={
          <span data-content-editable="x-component-props.title">
          {props.title}
        </span>
        }
        ref={dialog}
        data-dialog-id={nodeIdProps[designer.props.nodeIdAttrName]}
        getContainer={() => dialogContainer.current}
        maskClosable={false}
        transitionName={''}
        footer={
          footer?.children.length > 0 ? <TreeNodeWidget node={footer} key={footer?.id}/> :
            <DroppableWidget node={footer}/>
        }
        onCancel={() => {
          setVisible(false)
          dialog.current!.context!.visible = false
        }}>
        {
          visible && <>
            {
              body?.children.length > 0 ? <TreeNodeWidget node={body} key={body?.id}/> : <DroppableWidget node={body}/>
            }

          </>
        }
      </BaseDialog>
    </>
  )
})


Dialog.Behavior = createBehavior({
    name: 'Dialog',
    extends: [ 'Field' ],
    selector: (node) => node.props['x-component'] === 'Dialog',
    designerProps: {
      droppable: true,
      allowDrop: (node) => {
        return node.props['x-component'] !== 'Dialog.Body' && node.props['x-component'] !== 'Dialog.Footer'
      },
      propsSchema: createVoidFieldSchema(AllSchemas.Dialog),
    },
    designerLocales: AllLocales.Dialog,
  },
  {
    name: 'Dialog.Footer',
    extends: [ 'Field' ],
    selector: (node) => node.props['x-component'] === 'Dialog.Footer',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'Dialog.Footer',
      // propsSchema: createVoidFieldSchema(AllSchemas.Dialog),
    },
    designerLocales: AllLocales.DialogFooter,
  },
  {
    name: 'Dialog.Body',
    extends: [ 'Field' ],
    selector: (node) => node.props['x-component'] === 'Dialog.Body',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'Dialog.Body',
      // propsSchema: createVoidFieldSchema(AllSchemas.Dialog),
    },
    designerLocales: AllLocales.DialogBody,
  },
)

Dialog.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Dialog',
        'x-component-props': {
          title: '标题'
        },
      },
    },
  ],
})
