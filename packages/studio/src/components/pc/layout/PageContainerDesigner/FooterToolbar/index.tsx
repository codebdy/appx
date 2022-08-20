import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import React from "react"
import './locales'
import './schema'
import clx from "classnames"
import { IPageFooterToolbarProps } from "../../PageContainer/PageFooterToolbar"

const FooterToolbar = observer((props: IPageFooterToolbarProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx("rx-page-footer-toolbar-layout", className)}>
      {props.children}
    </DroppableWidget>
  )
})

export default FooterToolbar