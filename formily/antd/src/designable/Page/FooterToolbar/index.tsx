import { DroppableWidget } from "@designable/react"
import { observer } from "@formily/react"
import PageFooterToolbar, { IPageFooterToolbarProps } from "../../../executable/Page/PageFooterToolbar"
import React, { Fragment } from "react"
import './locales'
import './schema'
import clx from "classnames"


const FooterToolbar = observer((props: IPageFooterToolbarProps) => {
  const {className, ...other} = props
  return (
    <DroppableWidget {...other} className = {clx("rx-page-footer-toolbar-layout", className)}>
      {props.children}
    </DroppableWidget>
  )
})

export default FooterToolbar