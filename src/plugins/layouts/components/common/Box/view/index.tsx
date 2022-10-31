import { observer } from "@formily/reactive-react"
import React, { CSSProperties, useCallback } from "react"
import "./style.less"
import cls from "classnames"
import { IAppxAction } from "~/plugin-sdk"
import { useDoActions } from "~/shared/action"
import { message } from "antd"

export interface IComponentProps {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
  onClick?: IAppxAction[],
  cursor?: string,
}

const Component = observer((props: IComponentProps) => {
  const { className, onClick, cursor, style, ...other } = props;

  const doActions = useDoActions();

  const handleClick = useCallback(() => {
    if (!onClick) {
      return;
    }

    doActions(onClick)
      .then(() => {
      })
      .catch((error) => {
        error?.message && message.error(error?.message);
        error && console.error(error);
      })
      ;
  }, [doActions, onClick])

  return (
    <div
      className={cls("appx-box", className)}
      style={{ cursor, ...style }}
      {...other}
      onClick={handleClick}
    />
  )
})

export default Component;