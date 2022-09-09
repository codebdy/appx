import { IIcon } from "../../../shared/icon/model"
import React, { CSSProperties, useMemo, useState } from "react"
import { useParseLangMessage } from "../../../hooks/useParseLangMessage";
import { observer } from "@formily/reactive-react";
import { DialogContext } from "./context";
import { Button } from "antd";
import { IconView } from "../../../shared/icon/IconView";

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
  width?: number | string,
}

export const Dialog = observer((props: IDialogProps) => {
  const {
    icon,
    title,
    style,
    children,
    centered,
    closable,
    destroyOnClose,
    focusTriggerAfterClose,
    footer,
    keyboard,
    mask,
    maskClosable,
    width,
    ...other
  } = props;
  const [visiable, setVisiable] = useState(false);
  const p = useParseLangMessage();

  const contextValue = useMemo(() => {
    return { visiable, setVisiable }
  }, [visiable])
  return (
    <DialogContext.Provider value={contextValue}>
      <Button
        icon={icon && <IconView icon={icon} />}
        {...other}
      >
        {
          p(title)
        }
      </Button>
    </DialogContext.Provider>
  )
})