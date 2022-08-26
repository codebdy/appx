import React, { useCallback } from "react"
import { Button as AntdButton, ButtonProps } from "antd"
import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import { IconView } from "../../../../shared/icon/IconView"
import { useParseLangMessage } from "../../../../hooks/useParseLangMessage"
import { IAppxAction, useDoActions } from "../../../../shared/action"

export type IButtonProps = ButtonProps &
  React.RefAttributes<HTMLElement> & {
    title?: React.ReactElement,
    icon?: IIcon,
    onClick?: IAppxAction[]
  }

export const Button = observer((props: IButtonProps) => {
  const { title, icon, onClick, ...other } = props;
  const p = useParseLangMessage();

  const doActions = useDoActions();

  const handleClick = useCallback(() => {
    doActions(onClick);
  }, [doActions, onClick])

  return (
    <AntdButton {...other} onClick={handleClick} icon={icon && <IconView icon={icon} />}>
      {p(title)}
    </AntdButton>
  )
})
