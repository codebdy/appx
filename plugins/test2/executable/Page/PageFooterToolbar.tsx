import { observer } from "@formily/reactive-react"
import React from "react"

export interface IPageFooterToolbarProps {
  className?: string,
  children?: React.ReactNode
}

const PageFooterToolbar = observer((props: IPageFooterToolbarProps) => {
  return (
    <div className="rx-page-footer-toolbar rx-page-footer-toolbar-layout">
      {props.children}
    </div>
  )
})

export default PageFooterToolbar