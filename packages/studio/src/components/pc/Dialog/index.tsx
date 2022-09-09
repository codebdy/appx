import { IIcon } from "../../../shared/icon/model"
import React, { CSSProperties } from "react"

export interface IDialogProps {
  title?: string,
  dialogTitle?: string,
  icon?: IIcon,
  style?: CSSProperties,
  children?: React.ReactNode,

  centered?: boolean,
  closable?: boolean,
  destroyOnClose?: boolean,
  //关闭后聚焦触发元素
  focusTriggerAfterClose?: boolean,
  footer?: React.ReactNode,
  //是否支持键盘 esc 关闭
  keyboard?: boolean,
  //是否展示遮罩
  mask?: boolean,
  //点击蒙层是否允许关闭
  maskClosable?: boolean,
  width?: number | string,
}

export const Dialog = () => {
  return (
    <div>

    </div>
  )
}