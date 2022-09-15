import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React from "react"

export interface IAvatarProps {
  icon?: IIcon,
  value?: string,
}

export const Avatar = observer((props: IAvatarProps) => {
  return (
    <>
    哈哈哈
    </>
  )
})