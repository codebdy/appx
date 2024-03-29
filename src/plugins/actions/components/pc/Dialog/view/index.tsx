import React, { CSSProperties, useCallback, useMemo, useState } from "react"
import { observer } from "@formily/reactive-react";
import { DialogContext } from "./context";
import { Button, Modal } from "antd";
import { RecursionField, useFieldSchema, useField, Schema, ObjectField } from '@formily/react';
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Field } from "@formily/core";
import { DialogTitle, IDialogTitleProps } from "./DialogTitle";
import { DialogContent, IDialogContentProps } from "./DialogContent";
import { DialogFooter, IDialogFooterProps } from "./DialogFooter";
import { IconView, IIcon, useParseLangMessage, useInstanceParams } from '@rxdrag/plugin-sdk'

export interface IDialogProps {
  title?: string,
  icon?: IIcon,
  style?: CSSProperties,
  children?: React.ReactNode,

  centered?: boolean,
  closable?: boolean,
  destroyOnClose?: boolean,
  //关闭后聚焦触发元素
  focusTriggerAfterClose?: boolean,
  footer?: boolean,
  //是否支持键盘 esc 关闭
  keyboard?: boolean,
  //是否展示遮罩
  mask?: boolean,
  //点击蒙层是否允许关闭
  maskClosable?: boolean,
  changeRemind?: boolean,
  width?: number | string,
}

const Dialog: React.FC<IDialogProps> & {
  Title?: React.FC<IDialogTitleProps>,
  Content?: React.FC<IDialogContentProps>,
  Footer?: React.FC<IDialogFooterProps>,
} = observer((props) => {
  const {
    icon,
    title,
    style,
    children,
    centered,
    closable,
    destroyOnClose,
    focusTriggerAfterClose,
    footer: hasFooter,
    keyboard,
    mask,
    maskClosable,
    changeRemind,
    width,
    ...other
  } = props;
  const [visiable, setVisiable] = useState(false);
  const p = useParseLangMessage();
  const { t } = useTranslation()
  const field = useField();
  const fieldSchema = useFieldSchema()

  const instanceParams = useInstanceParams()

  const slots = useMemo(() => {
    const slts = {
      title: null,
      content: null,
      footer: null,
    }

    for (const child of Schema.getOrderProperties(fieldSchema)) {
      const childSchema = child?.schema;
      if (childSchema["x-component"] === 'Dialog.Title') {
        slts.title = childSchema
      } else if (childSchema["x-component"] === 'Dialog.Content') {
        slts.content = childSchema
      } else if (childSchema["x-component"] === 'Dialog.Footer') {
        slts.footer = childSchema
      }
    }
    return slts;
  }, [fieldSchema])

  const handleClose = useCallback(() => {
    if (changeRemind && (field as Field).modified) {
      Modal.confirm({
        title: t("CloseConfirm") || t('Confirm'),
        icon: <ExclamationCircleOutlined />,
        content: t("SaveRemind"),
        okText: t("Confirm"),
        cancelText: t("Cancel"),
        onOk: () => setVisiable(false),
      });
    } else {
      setVisiable(false);
    }

  }, [changeRemind, field, t])

  const contextValue = useMemo(() => {
    return { visiable, onClose: handleClose }
  }, [handleClose, visiable])

  const handleCancel = useCallback(() => {
    handleClose()
  }, [handleClose])

  const handleClick = useCallback(() => {
    setVisiable(true)
  }, [])

  return (
    <>
      <Button
        icon={icon && <IconView icon={icon} />}
        {...other}
        onClick={handleClick}
      >
        {
          p(title)
        }
      </Button>

      {
        visiable &&
        <DialogContext.Provider value={contextValue}>
          {/* initialValue会有堆栈溢出bug，好奇怪 */}
          <ObjectField name={fieldSchema.name} value = {instanceParams?.instance}>
            <Modal
              title={slots.title && <RecursionField schema={slots.title} name={slots.title.name} />}
              footer={slots.footer && <RecursionField schema={slots.footer} name={slots.footer.name} />}
              open={visiable}
              onCancel={handleCancel}
            >
              {slots.content && <RecursionField schema={slots.content} name={slots.content.name} />}
            </Modal>
          </ObjectField>
        </DialogContext.Provider>
      }
    </>
  )
})

Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;

export default Dialog;