import React, { useCallback, useState } from "react"
import { Button as AntdButton, ButtonProps, message } from "antd"
import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../shared/icon/model"
import { IconView } from "../../../shared/icon/IconView"
import { useParseLangMessage } from "../../../hooks/useParseLangMessage"
import { IAppxAction, useDoActions } from "../../../shared/action"

export type IButtonProps = ButtonProps &
  React.RefAttributes<HTMLElement> & {
    title?: React.ReactElement,
    icon?: IIcon,
    onClick?: IAppxAction[]
  }

export const Button = observer((props: IButtonProps) => {
  const { title, icon, onClick, ...other } = props;
  const [loading, setLoading] = useState(false);

  const p = useParseLangMessage();

  const doActions = useDoActions();

  const handleClick = useCallback(() => {
    if (!onClick) {
      return;
    }
    setLoading(true)
    doActions(onClick)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error?.message && message.error(error?.message);
        error && console.error(error);
      })
      ;
  }, [doActions, onClick])

  return (
    <AntdButton
      {...other}
      onClick={handleClick}
      icon={icon && <IconView icon={icon} />}
      loading={loading}
    >
      {p(title)}
    </AntdButton>
  )
})
